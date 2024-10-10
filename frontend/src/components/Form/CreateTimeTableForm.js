import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, FormHelperText } from '@mui/material';

const CreateTimeTableForm = () => {
  const [sessionData, setSessionData] = useState([]);
  const [currentsesData, setCurrentsesData] = useState([]);
  const [progDepData, setProgDepData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Fetching session data for springFallYear and sessionBatch dropdowns
        const sessionResponse = await axios.get('http://localhost:3001/api/adminPanel/createtimetable/getsesid', {
          headers: { token },
        });
        setSessionData(sessionResponse.data);

        //////////////
        /////////////
        const currentsesResponse = await axios.get(' http://localhost:3001/api/adminPanel/createtimetable/getcsid', {
          headers: { token },
        });
        setCurrentsesData(currentsesResponse.data);

        // Fetching program and department data
        const progDepResponse = await axios.get(' http://localhost:3001/api/adminPanel/createtimetable/getprogid', {
          headers: { token },
        });
        setProgDepData(progDepResponse.data);

        ///////////
        //////////
        const departmentResponse = await axios.get(' http://localhost:3001/api/adminPanel/createtimetable/getdepid', {
          headers: { token },
        });
        setDepartmentData(departmentResponse.data);

        // Fetching course data
        const courseResponse = await axios.get('http://localhost:3001/api/adminPanel/createtimetable/getosid', {
          headers: { token },
        });
        setCourseData(courseResponse.data);

        // Fetching teacher data
        const teacherResponse = await axios.get('http://localhost:3001/api/adminPanel/createtimetable/getteacherid', {
          headers: { token },
        });
        setTeacherData(teacherResponse.data);

        // Fetching room data
        const roomResponse = await axios.get('http://localhost:3001/api/adminPanel/createtimetable/getavrid', {
          headers: { token },
        });
        setRoomData(roomResponse.data);

        // Fetching section data
        const sectionResponse = await axios.get('http://localhost:3001/api/adminPanel/createtimetable/getsecid', {
          headers: { token },
        });
        setSectionData(sectionResponse.data);

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
    program_name: Yup.string().required('Program Name is required'),
    springFallYear: Yup.string().required('Spring/Fall and Year is required'),
    sessionBatch: Yup.string().required('Session and Batch is required'),
    department_name: Yup.string().required('Department is required'),
    section_name: Yup.string().required('Section Name is required'),
    teacher_name: Yup.string().required('Teacher is required'),
    roomDepartment: Yup.string().required('Room is required'),
    course_name: Yup.string().required('Course is required'),
    time: Yup.string().required('Time is required'),
    day: Yup.string().required('Day is required'),
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
    const [room_number, department] = values.roomDepartment.split(' - ');

    try {
      // API call to create the timetable
      const response = await fetch('http://localhost:3001/api/adminPanel/createtimetable/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          program_name: values.program_name,
          springFall,      // separate value
          year,            // separate value
          session_name,    // separate value
          batch,           // separate value
          department_name: values.department_name,
          section_name: values.section_name,
          teacher_name: values.teacher_name,
          room_number,
          department,
          course_name: values.course_name,
          time: values.time,
          day: values.day,
        }),
      });

      if (response.ok) {
        console.log('Timetable created successfully');
        resetForm(); // Reset form on success
      } else {
        console.error('Failed to create timetable');
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
        program_name: '',
        springFallYear: '',
        sessionBatch: '',
        department_name: '',
        section_name: '',
        teacher_name: '',
        roomDepartment: '',
        course_name: '',
        time: '',
        day: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, values, isSubmitting }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Create Timetable</Typography>

            {/* Program Name Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.program_name && !!errors.program_name}>
              <InputLabel>Program Name</InputLabel>
              <Select
                name="program_name"
                value={values.program_name}
                onChange={handleChange}
                label="Program Name"
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
                  currentsesData.length > 0 ? (
                    currentsesData.map((item, index) => (
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

            {/* Department Dropdown */}
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
                  departmentData.length > 0 ? (
                    departmentData.map((item, index) => (
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

            {/* Section Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.section_name && !!errors.section_name}>
              <InputLabel>Section Name</InputLabel>
              <Select
                name="section_name"
                value={values.section_name}
                onChange={handleChange}
                label="Section Name"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  sectionData.length > 0 ? (
                    sectionData.map((item, index) => (
                      <MenuItem key={index} value={item.section_name}>
                        {item.section_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Sections available</MenuItem>
                  )
                )}
              </Select>
              {touched.section_name && errors.section_name && (
                <FormHelperText>{errors.section_name}</FormHelperText>
              )}
            </FormControl>

            {/* Teacher Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.teacher_name && !!errors.teacher_name}>
              <InputLabel>Teacher</InputLabel>
              <Select
                name="teacher_name"
                value={values.teacher_name}
                onChange={handleChange}
                label="Teacher"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  teacherData.length > 0 ? (
                    teacherData.map((item, index) => (
                      <MenuItem key={index} value={item.teacher_name}>
                        {item.teacher_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Teachers available</MenuItem>
                  )
                )}
              </Select>
              {touched.teacher_name && errors.teacher_name && (
                <FormHelperText>{errors.teacher_name}</FormHelperText>
              )}
            </FormControl>

            {/* Room Number Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.roomDepartment && !!errors.roomDepartment}>
              <InputLabel>Room Number</InputLabel>
              <Select
                name="roomDepartment"
                value={values.roomDepartment}
                onChange={handleChange}
                label="Department Room Number"
                disabled={loading}
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  roomData.length > 0 ? (
                    roomData.map((item, index) => (
                      <MenuItem key={index} value={`${item.room_number} - ${item.department}`}>
                        {item.room_number} - {item.department}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Rooms available</MenuItem>
                  )
                )}
              </Select>
              {touched.roomDepartment && errors.roomDepartment && (
                <FormHelperText>{errors.roomDepartment}</FormHelperText>
              )}
            </FormControl>

            {/* Course Name Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.course_name && !!errors.course_name}>
              <InputLabel>Course Name</InputLabel>
              <Select
                name="course_name"
                value={values.course_name}
                onChange={handleChange}
                label="Course Name"
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

            {/* Time Input */}
            <FormControl fullWidth margin="normal" error={touched.time && !!errors.time}>
              <InputLabel htmlFor="time">Time</InputLabel>
              <Field
                as="input"
                type="time"
                name="time"
                id="time"
                style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
              />
              {touched.time && errors.time && (
                <FormHelperText>{errors.time}</FormHelperText>
              )}
            </FormControl>

            {/* Day Dropdown */}
            <FormControl fullWidth margin="normal" error={touched.day && !!errors.day}>
              <InputLabel>Day</InputLabel>
              <Select
                name="day"
                value={values.day}
                onChange={handleChange}
                label="Day"
                disabled={loading}
              >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
              </Select>
              {touched.day && errors.day && (
                <FormHelperText>{errors.day}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || loading}>
              {isSubmitting ? 'Submitting...' : 'Create Timetable'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTimeTableForm;
