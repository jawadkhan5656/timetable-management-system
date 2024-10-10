import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';

const SessionForm = () => {

  // Validation schema for Formik
  const validationSchema = Yup.object({
    session_name: Yup.string().required('Session Name is required'),
    batch: Yup.string().required('Batch is required'),
  });


  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form Values:', values);  // Log to inspect the values
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/adminPanel/session/addsession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log("Session added successfully");
        resetForm();
      } else {
        console.error('Failed to add session');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };
  

     
  return (
    <Formik
      initialValues={{ session_name: '', batch: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => ( // Access values here
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Session</Typography>
            
            {/* Dropdown for session name */}
            <FormControl fullWidth margin="normal" error={touched.session_name && !!errors.session_name}>
              <InputLabel id="session-name-label">Session Name</InputLabel>
              <Select
                labelId="session-name-label"
                name="session_name"
                value={values.session_name} // Use values from Formik's state
                onChange={(event) => setFieldValue("session_name", event.target.value)}
              >
                <MenuItem value="Spring">Spring</MenuItem>
                <MenuItem value="Fall">Fall</MenuItem>
              </Select>
              {touched.session_name && errors.session_name && (
                <FormHelperText>{errors.session_name}</FormHelperText>
              )}
            </FormControl>

            {/* Batch text field */}
            <Field
              as={TextField}
              name="batch"
              label="Batch"
              fullWidth
              margin="normal"
              error={touched.batch && !!errors.batch}
              helperText={touched.batch && errors.batch}
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
              Add Session
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SessionForm;
