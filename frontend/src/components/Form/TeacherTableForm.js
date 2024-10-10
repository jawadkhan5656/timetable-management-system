import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import TeacherTimetable from './TeacherTimetable';

const TeacherTableForm = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  // Fetch teacher data from the API
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/frontview/getteacher', {
          headers: { token },
        });
        setTeacherData(response.data); // Set fetched teacher data
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    department_name: Yup.string().required('Department Name is required'),
    teacher_name: Yup.string().required('Teacher Name is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form Values:', values);
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      // Fetch timetable data for the selected teacher and department
      const response = await axios.get('http://localhost:3001/api/frontview/viewteachertable', {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        params: {
          department_name: values.department_name,
          teacher_name: values.teacher_name,
        },
      });

      if (response.status === 200) {
        console.log('Teacher timetable data fetched successfully', response.data);
        setTableData(response.data); // Set fetched teacher timetable data
        resetForm(); // Reset form fields after submission
      } else {
        console.error('Failed to fetch teacher timetable data');
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ department_name: '', teacher_name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>
              Teacher Table
            </Typography>

            {/* Dropdown for Department Name */}
            <FormControl fullWidth margin="normal" error={touched.department_name && !!errors.department_name}>
              <InputLabel>Department</InputLabel>
              <Select
                name="department_name"
                value={values.department_name}
                onChange={(event) => setFieldValue('department_name', event.target.value)}
                label="Department"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  teacherData.map((teacher) => (
                    <MenuItem key={teacher.department_id} value={teacher.department_name}>
                      {teacher.department_name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {touched.department_name && errors.department_name && (
                <FormHelperText>{errors.department_name}</FormHelperText>
              )}
            </FormControl>

            {/* Dropdown for Teacher Name */}
            <FormControl fullWidth margin="normal" error={touched.teacher_name && !!errors.teacher_name}>
              <InputLabel>Teacher Name</InputLabel>
              <Select
                name="teacher_name"
                value={values.teacher_name}
                onChange={(event) => setFieldValue('teacher_name', event.target.value)}
                label="Teacher"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  teacherData.map((teacher) => (
                    <MenuItem key={teacher.teacher_id} value={teacher.teacher_name}>
                      {teacher.teacher_name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {touched.teacher_name && errors.teacher_name && (
                <FormHelperText>{errors.teacher_name}</FormHelperText>
              )}
            </FormControl>

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
              View Teacher TimeTable
            </Button>

            {/* Render fetched teacher table data */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6"></Typography>
              {tableData.length > 0 ? (
                <TeacherTimetable TeacherTimetable={tableData} />
              ) : (
                <Typography></Typography>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TeacherTableForm;
