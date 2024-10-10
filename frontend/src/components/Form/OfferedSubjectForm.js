import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';

const OfferedSubjectForm = () => {
  const [sessionData, setSessionData] = useState([]);
  const [progDepData, setProgDepData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Fetching session data
        const sessionResponse = await axios.get('http://localhost:3001/api/adminPanel/offeredsubjects/getsescsid', {
          headers: { token },
        });
        setSessionData(sessionResponse.data);

        // Fetching program and department data
        const progDepResponse = await axios.get('http://localhost:3001/api/adminPanel/offeredsubjects/getprogdepid', {
          headers: { token },
        });
        setProgDepData(progDepResponse.data);

        // Fetching course data
        const courseResponse = await axios.get('http://localhost:3001/api/adminPanel/offeredsubjects/getcourseid', {
          headers: { token },
        });
        setCourseData(courseResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    springFallYear: Yup.string().required('Spring/Fall and Year is required'),
    sessionBatch: Yup.string().required('Session and Batch is required'),
    department_name: Yup.string().required('Department is required'),
    program_name: Yup.string().required('Program is required'),
    course_name: Yup.string().required('Course is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    const [springFall, year] = values.springFallYear.split(' - ');
    const [session_name, batch] = values.sessionBatch.split(' - ');

    try {
      // API call to add the subject
      const response = await fetch(' http://localhost:3001/api/adminPanel/offeredsubjects/addoffersubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          springFall,      // separate value
          year,            // separate value
          session_name,    // separate value
          batch,           // separate value
          department_name: values.department_name,
          program_name: values.program_name,
          course_name: values.course_name,
        }),
      });

      if (response.ok) {
        console.log('Subject added successfully');
        resetForm(); // Reset form on success
      } else {
        const errorResponse = await response.json();
        console.error('Failed to add subject:', errorResponse);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        springFallYear: '',
        sessionBatch: '',
        department_name: '',
        program_name: '',
        course_name: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, handleChange, values }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>
              Add Offered Subject
            </Typography>

            {/* SpringFall and Year Combined Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.springFallYear && !!errors.springFallYear}>
              <InputLabel>Spring/Fall and Year</InputLabel>
              <Select
                name="springFallYear"
                value={values.springFallYear}
                onChange={handleChange}
                label="Spring/Fall and Year"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  sessionData.length > 0 ? (
                    sessionData.map((item, index) => (
                      <MenuItem key={index} value={`${item.springFall} - ${item.year}`}>
                        {item.springFall} - {item.year}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Spring/Fall and Year available</MenuItem>
                  )
                )}
              </Select>
              {touched.springFallYear && errors.springFallYear && (
                <FormHelperText>{errors.springFallYear}</FormHelperText>
              )}
            </FormControl>

            {/* Session Name and Batch Combined Dropdown */}
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
                  sessionData.length > 0 ? (
                    sessionData.map((item, index) => (
                      <MenuItem key={index} value={`${item.session_name} - ${item.batch}`}>
                        {item.session_name} - {item.batch}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Sessions and Batches available</MenuItem>
                  )
                )}
              </Select>
              {touched.sessionBatch && errors.sessionBatch && (
                <FormHelperText>{errors.sessionBatch}</FormHelperText>
              )}
            </FormControl>

            {/* Department Name Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.department_name && !!errors.department_name}>
              <InputLabel>Department</InputLabel>
              <Select
                name="department_name"
                value={values.department_name}
                onChange={handleChange}
                label="Department"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  progDepData.length > 0 ? (
                    progDepData.map((item, index) => (
                      <MenuItem key={index} value={item.department_name}>
                        {item.department_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Departments available</MenuItem>
                  )
                )}
              </Select>
              {touched.department_name && errors.department_name && (
                <FormHelperText>{errors.department_name}</FormHelperText>
              )}
            </FormControl>

            {/* Program Name Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.program_name && !!errors.program_name}>
              <InputLabel>Program</InputLabel>
              <Select
                name="program_name"
                value={values.program_name}
                onChange={handleChange}
                label="Program"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  progDepData.length > 0 ? (
                    progDepData.map((item, index) => (
                      <MenuItem key={index} value={item.program_name}>
                        {item.program_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Programs available</MenuItem>
                  )
                )}
              </Select>
              {touched.program_name && errors.program_name && (
                <FormHelperText>{errors.program_name}</FormHelperText>
              )}
            </FormControl>

            {/* Course Name Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.course_name && !!errors.course_name}>
              <InputLabel>Course</InputLabel>
              <Select
                name="course_name"
                value={values.course_name}
                onChange={handleChange}
                label="Course"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  courseData.length > 0 ? (
                    courseData.map((item, index) => (
                      <MenuItem key={index} value={item.course_name}>
                        {item.course_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Courses available</MenuItem>
                  )
                )}
              </Select>
              {touched.course_name && errors.course_name && (
                <FormHelperText>{errors.course_name}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                '&:hover': {
                  backgroundColor: 'gray',
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default OfferedSubjectForm;
