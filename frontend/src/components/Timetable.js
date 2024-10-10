import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // For validation schema
import axios from 'axios';
import ViewTimetable from './ViewTimetable';

const Timetable = () => {
  // State to hold dropdown options
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [combinedSessionBatchOptions, setCombinedSessionBatchOptions] = useState([]);
  const [combinedSpringFallYearOptions, setCombinedSpringFallYearOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timetableData, setTimetableData] = useState([]);

  // Fetch department and program options
  useEffect(() => {
    const fetchProgramAndDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/frontview/progdepid');
        // Assuming response.data is an array of objects with program_name and department_name
        const programs = response.data.map(item => item.program_name);
        const departments = response.data.map(item => item.department_name);
        setProgramOptions([...new Set(programs)]); // Remove duplicates
        setDepartmentOptions([...new Set(departments)]); // Remove duplicates
      } catch (error) {
        console.error('Error fetching program and department:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramAndDepartment();
  }, []);

  // Fetch session, batch, springFall, and year options, and combine them
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/frontview/sesid');
        // Assuming response.data is an array of objects with session_name, batch, springFall, and year
        const combinedSessionBatch = response.data.map(item => ({
          label: `${item.session_name} - ${item.batch}`,
          session_name: item.session_name,
          batch: item.batch,
        }));

        const combinedSpringFallYear = response.data.map(item => ({
          label: `${item.springFall} - ${item.year}`,
          springFall: item.springFall,
          year: item.year,
        }));

        setCombinedSessionBatchOptions(combinedSessionBatch);
        setCombinedSpringFallYearOptions(combinedSpringFallYear);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessionData();
  }, []);

  // Fetch section options
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/frontview/secid');
        // Assuming response.data is an array of objects with section_name
        const sections = response.data.map(item => item.section_name);
        setSectionOptions([...new Set(sections)]);
      } catch (error) {
        console.error('Error fetching Section:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, []);

  // Validation schema
  const validationSchema = Yup.object().shape({
    program_name: Yup.string().required('Program is required'),
    combinedSessionBatch: Yup.string().required('Session/Batch is required'),
    combinedSpringFallYear: Yup.string().required('Spring/Fall and Year is required'),
    section_name: Yup.string().required('Section is required'),
    department_name: Yup.string().required('Department is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Viewing Timetable form:', values);
    try {
      // Extract the separated values for session_name, batch, springFall, and year
      const [session_name, batch] = values.combinedSessionBatch.split(' - ');
      const [springFall, year] = values.combinedSpringFallYear.split(' - ');

      const formValues = {
        ...values,
        session_name,
        batch,
        springFall,
        year,
      };

      // Pass values as query parameters using the params option
      const response = await axios.get('http://localhost:3001/api/frontview/viewtimetable', {
        params: formValues, // This sends the form values in the query params
      });
      console.log('Timetable data:', response.data);
      setTimetableData(response.data);
      // Handle displaying the timetable data
      resetForm();
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box id="timetable-section" sx={{ padding: 3, maxWidth: 780, margin: '0 auto' }}>
      <Typography variant='h4' align='center' gutterBottom>
        Timetable
      </Typography>
      <Formik
        initialValues={{
          program_name: '',
          combinedSessionBatch: '',
          combinedSpringFallYear: '',
          section_name: '',
          department_name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, touched, errors, isSubmitting }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
              }}
            >
              {/* Department Dropdown */}
              <FormControl fullWidth margin="normal" error={touched.department_name && !!errors.department_name}>
                <InputLabel>Department Name</InputLabel>
                <Field
                  name="department_name"
                  as={Select}
                  label="Department Name"
                  value={values.department_name}
                  onChange={handleChange}
                  fullWidth
                >
                  {departmentOptions.map((dept, index) => (
                    <MenuItem key={index} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Field>
                {touched.department_name && errors.department_name && (
                  <Typography variant="body2" color="error">
                    {errors.department_name}
                  </Typography>
                )}
              </FormControl>

              {/* Program Dropdown */}
              <FormControl fullWidth margin="normal" error={touched.program_name && !!errors.program_name}>
                <InputLabel>Program Name</InputLabel>
                <Field
                  name="program_name"
                  as={Select}
                  label="Program Name"
                  value={values.program_name}
                  onChange={handleChange}
                  fullWidth
                >
                  {programOptions.map((program, index) => (
                    <MenuItem key={index} value={program}>
                      {program}
                    </MenuItem>
                  ))}
                </Field>
                {touched.program_name && errors.program_name && (
                  <Typography variant="body2" color="error">
                    {errors.program_name}
                  </Typography>
                )}
              </FormControl>

              {/* Combined Session + Batch Dropdown */}
              <FormControl fullWidth margin="normal" error={touched.combinedSessionBatch && !!errors.combinedSessionBatch}>
                <InputLabel>Session Name - Batch</InputLabel>
                <Field
                  name="combinedSessionBatch"
                  as={Select}
                  label="Session Name - Batch"
                  value={values.combinedSessionBatch}
                  onChange={handleChange}
                  fullWidth
                >
                  {combinedSessionBatchOptions.map((option, index) => (
                    <MenuItem key={index} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                {touched.combinedSessionBatch && errors.combinedSessionBatch && (
                  <Typography variant="body2" color="error">
                    {errors.combinedSessionBatch}
                  </Typography>
                )}
              </FormControl>

              {/* Combined SpringFall + Year Dropdown */}
              <FormControl fullWidth margin="normal" error={touched.combinedSpringFallYear && !!errors.combinedSpringFallYear}>
                <InputLabel>Spring/Fall - Year</InputLabel>
                <Field
                  name="combinedSpringFallYear"
                  as={Select}
                  label="Spring/Fall - Year"
                  value={values.combinedSpringFallYear}
                  onChange={handleChange}
                  fullWidth
                >
                  {combinedSpringFallYearOptions.map((option, index) => (
                    <MenuItem key={index} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                {touched.combinedSpringFallYear && errors.combinedSpringFallYear && (
                  <Typography variant="body2" color="error">
                    {errors.combinedSpringFallYear}
                  </Typography>
                )}
              </FormControl>

              {/* Section Dropdown */}
              <FormControl fullWidth margin="normal" error={touched.section_name && !!errors.section_name}>
                <InputLabel>Section Name</InputLabel>
                <Field
                  name="section_name"
                  as={Select}
                  label="Section Name"
                  value={values.section_name}
                  onChange={handleChange}
                  fullWidth
                >
                  {sectionOptions.map((section, index) => (
                    <MenuItem key={index} value={section}>
                      {section}
                    </MenuItem>
                  ))}
                </Field>
                {touched.section_name && errors.section_name && (
                  <Typography variant="body2" color="error">
                    {errors.section_name}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || loading}
              sx={{ mt: 2 }}
            >
              View Timetable
            </Button>
          </Form>
        )}
      </Formik>
      {/* Show timetable after form submission */}
      {timetableData.length > 0 && <ViewTimetable timetableData={timetableData} />}
    </Box>
  );
};

export default Timetable;
