import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';

const DepartmentForm = () => {
  // Validation schema for Formik
  const validationSchema = Yup.object({
    department_name: Yup.string().required('Department Name is required'),
  });

  // Handle form submission 
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token'); // Retrieve the token
  
    try {
      const response = await fetch('http://localhost:3001/api/adminPanel/department/adddepartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,  // Use the retrieved token
        },
        body: JSON.stringify(values),
      });
  
      // Log the response status
      console.log('Response Status:', response.status);
      
      // Check if the response is okay
      if (!response.ok) {
        // If the response is not ok, get the error text (for non-JSON responses)
        const errorText = await response.text();  // Use the correct lowercase `response`
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      // Try to parse the response as JSON
      const data = await response.json();
      console.log('Department added successfully:', data);
  
      resetForm();
    } catch (error) {
      // Just log the error message (since the 'response' object isn't available in catch)
      console.error('Error adding department:', error.message); 
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Formik
      initialValues={{ department_name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Department</Typography>
            <Field
              as={TextField}
              name="department_name"
              label="Department Name"
              fullWidth
              margin="normal"
              error={touched.department_name && !!errors.department_name}
              helperText={touched.department_name && errors.department_name}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                mt: 2,
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white'
                }
              }}
            >
              Add Department
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DepartmentForm;
