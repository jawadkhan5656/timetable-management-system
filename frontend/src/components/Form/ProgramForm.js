import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Box, Button, Typography } from '@mui/material';
import axios from 'axios';

const ProgramForm = () => {
  // State to hold the department data
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch department data from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/adminPanel/programs/getids', {
          headers: { token },
        });
        setDepartments(response.data); // Set the fetched data to departments
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments(); // Call the function
  }, []);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    program_name: Yup.string().required('Program Name is required'),
    credits_required: Yup.number().required('Credits required'),
    department_name: Yup.string().required('Department Name is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form values:', values);
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No Token found');
      return;
    }

    try {
      // API call to add a program
      const response = await fetch('http://localhost:3001/api/adminPanel/programs/addprogram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(values), // Sends form data including department_name
      });

      if (response.ok) {
        console.log('Program added successfully');
        resetForm(); // Reset form on success
      } else {
        console.error('Failed to add Program');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ program_name: '', credits_required: '', department_name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, handleChange, values }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Program</Typography>

            {/* Program Name Input */}
            <Field
              as={TextField}
              name="program_name"
              label="Program Name"
              fullWidth
              margin="normal"
              error={touched.program_name && !!errors.program_name}
              helperText={touched.program_name && errors.program_name}
            />

            {/* Credits Required Input */}
            <Field
              as={TextField}
              name="credits_required"
              label="Credits Required"
              fullWidth
              margin="normal"
              error={touched.credits_required && !!errors.credits_required}
              helperText={touched.credits_required && errors.credits_required}
            />

            {/* Department Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.department_name && !!errors.department_name}>
              <InputLabel>Department</InputLabel>
              <Select
                name="department_name"
                value={values.department_name}
                onChange={handleChange}
                label="Department"
                disabled={loading} // Disable while loading data
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem> // Show loading option
                ) : (
                  departments.map((dept, index) => (
                    <MenuItem key={index} value={dept.department_name}>
                      {dept.department_name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {touched.department_name && errors.department_name && (
                <FormHelperText>{errors.department_name}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
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
                  color: 'white',
                },
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Add Program'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProgramForm;
