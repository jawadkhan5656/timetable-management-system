import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

const CourseForm = () => {
  const [departments, setDepartments] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/adminPanel/courses/getdepid', {
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

  // Validation schema
  const validationSchema = Yup.object({
    course_name: Yup.string().required('Course Name is required'),
    course_code: Yup.string().required('Course Code is required'),
    credits: Yup.string().required('Credits are required'),
    department_name: Yup.string().required('Department is required'), // Required dropdown field
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
      const response = await fetch('http://localhost:3001/api/adminPanel/courses/addcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(values), // Sends form data including department_name
      });

      if (response.ok) {
        console.log('Course added successfully');
        resetForm(); // Reset form on success
      } else {
        console.error('Failed to add course');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
 };

  return (
    <Formik
      initialValues={{ course_name: '', course_code: '', credits: '', department_name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, handleChange, values }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Course</Typography>

            <Field
              as={TextField}
              name="course_name"
              label="Course Name"
              fullWidth
              margin="normal"
              error={touched.course_name && !!errors.course_name}
              helperText={touched.course_name && errors.course_name}
            />

            <Field
              as={TextField}
              name="course_code"
              label="Course Code"
              fullWidth
              margin="normal"
              error={touched.course_code && !!errors.course_code}
              helperText={touched.course_code && errors.course_code}
            />

            <Field
              as={TextField}
              name="credits"
              label="Credits"
              fullWidth
              margin="normal"
              error={touched.credits && !!errors.credits}
              helperText={touched.credits && errors.credits}
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading} // Disable button when submitting or loading
              sx={{
                mt: 2,
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Add Course'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;
