import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
// import axios from 'axios'; // Import axios for API requests

const SectionForm = () => {
  // Validation schema for Formik
  const validationSchema = Yup.object({
    section_name: Yup.string().required('Section Name is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:3001/api/adminPanel/section/addsection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(values),
      });
      console.log('Response status', response.status);
  
      if (!response.ok) {
        const errorText = await response.text(); // Handle non-JSON error responses
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      // Check if response is JSON or plain text
      const contentType = response.headers.get('Content-Type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json(); // Parse as JSON
      } else {
        data = await response.text(); // Parse as text (or other format)
      }
  
      console.log('Section added successfully:', data);
  
      resetForm();
    } catch (error) {
      console.error('Error adding section:', error);
    } finally {
      setSubmitting(false);
    }
  };
  


  return (
    <Formik
      initialValues={{ section_name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Section</Typography>
            <Field
              as={TextField}
              name="section_name"
              label="Section Name"
              fullWidth
              margin="normal"
              error={touched.section_name && !!errors.section_name}
              helperText={touched.sectionName && errors.section_name}
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
              Add Section
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SectionForm;
