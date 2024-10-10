import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, FormHelperText } from '@mui/material';

const CurrentSessionForm = () => {
  const [sessionBatches, setSessionBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data for both batches and sessions when the component mounts
  useEffect(() => {
    const fetchSessionBatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/adminPanel/semester/getsessionid', {
          headers: { token },
        });

        const data = response.data;

        // Create a combined array of session and batch
        const combined = data.map(item => ({
          value: `${item.session_name} - Batch ${item.batch}`,
          session_name: item.session_name,
          batch: item.batch,
        }));

        setSessionBatches(combined);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionBatches();
  }, []);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    springFall: Yup.string().required('SpringFall is required'),
    sessionBatch: Yup.string().required('Session and Batch are required'),
    year: Yup.number().required('Year is required'),
  });

  // Handle form submission
  const handleCurrentSession = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    const [session_name, batch] = values.sessionBatch.split(' - Batch ');

    try {
      // API call to add the session
      const response = await fetch('http://localhost:3001/api/adminPanel/semester/addsemester', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          springFall: values.springFall,
          year: values.year,
          session_name,
          batch,
        }),
      });

      if (response.ok) {
        console.log('Current session added successfully');
        resetForm(); // Reset form on success
      } else {
        const errorResponse = await response.json();
        console.error('Failed to add current session:', errorResponse);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ springFall: '', sessionBatch: '', year: '' }}
      validationSchema={validationSchema}
      onSubmit={handleCurrentSession}
    >
      {({ errors, touched, isSubmitting, handleChange, values }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Current Session</Typography>
            
           {/* SpringFall Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.springFall && !!errors.springFall}>
              <InputLabel>Spring/Fall</InputLabel>
              <Select
                name="springFall"
                value={values.springFall}
                onChange={handleChange}
                label="Spring/Fall"
              >
                <MenuItem value="spring">Spring</MenuItem>
                <MenuItem value="fall">Fall</MenuItem>
              </Select>
              {touched.springFall && errors.springFall && (
                <FormHelperText>{errors.springFall}</FormHelperText>
              )}
            </FormControl>


            {/* Session and Batch Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.sessionBatch && !!errors.sessionBatch}>
              <InputLabel>Session and Batch</InputLabel>
              <Select
                name="sessionBatch"
                value={values.sessionBatch}
                onChange={handleChange}
                label="Session and Batch"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  sessionBatches.length > 0 ? (
                    sessionBatches.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.value} {/* Display combined session and batch value */}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No sessions and batches available</MenuItem>
                  )
                )}
              </Select>
              {touched.sessionBatch && errors.sessionBatch && (
                <FormHelperText>{errors.sessionBatch}</FormHelperText>
              )}
            </FormControl>

            {/* Year Field */}
            <Field
              as={TextField}
              name="year"
              label="Year"
              fullWidth
              margin="normal"
              error={touched.year && !!errors.year}
              helperText={touched.year && errors.year}
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
              {isSubmitting ? 'Submitting...' : 'Add Current Session'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CurrentSessionForm;
