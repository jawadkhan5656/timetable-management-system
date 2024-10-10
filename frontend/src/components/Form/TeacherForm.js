import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import axios from 'axios';

const TeacherForm = () => {
  const [departments, setDepartments] = useState([]); // Initialize departments as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Fetch departments when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/adminPanel/teachers/getdepid', {
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
    teacher_name: Yup.string().required('Teacher Name is required'),
    department_name: Yup.string().required('Department Name is required'),
    designation: Yup.string().required('Designation is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form values:', values);
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    try {
      // API call to add a course
      const response = await fetch('http://localhost:3001/api/adminPanel/teachers/addteacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(values), // Sends form data including department_name
      });

      if (response.ok) {
        console.log('Teacher added successfully');
        resetForm(); // Reset form on success
      } else {
        console.error('Failed to add teacher');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ teacher_name: '', department_name: '', designation: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, handleChange, values }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Teacher</Typography>
            
            <Field
              as={TextField}
              name="teacher_name"
              label="Teacher Name"
              fullWidth
              margin="normal"
              error={touched.teacher_name && !!errors.teacher_name}
              helperText={touched.teacher_name && errors.teacher_name}
            />

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

            <Field
              as={TextField}
              name="designation"
              label="Designation"
              fullWidth
              margin="normal"
              error={touched.designation && !!errors.designation}
              helperText={touched.designation && errors.designation}
            />

            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading} // Disable the button during submitting or loading
              sx={{
                mt: 2,
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
            >
              {isSubmitting ? 'Adding...' : 'Add Teacher'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TeacherForm;
