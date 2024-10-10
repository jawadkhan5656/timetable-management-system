import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const AvailableRoomForm = () => {
  const [springFallOptions, setSpringFallOptions] = useState([]);
  const [roomNumberOptions, setRoomNumberOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:00:00');

  useEffect(() => {
    const fetchCS = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/adminPanel/availableRooms/getcsid', {
          headers: { token },
        });
        setSpringFallOptions(response.data);
      } catch (error) {
        console.error('Error fetching springFall year:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCS();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/adminPanel/availableRooms/getroomids', {
          headers: { token },
        });
        setRoomNumberOptions(response.data);
        setDepartmentOptions(response.data);
      } catch (error) {
        console.error('Error fetching departments and rooms', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Validation schema for Formik
  const validationSchema = Yup.object({
    springFallYear: Yup.string().required('SpringFall and Year are required'),
    room_number: Yup.string().required('Room Number is required'),
    department: Yup.string().required('Department is required'),
    start_time: Yup.string().required('Start time is required').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Start time must be in HH:mm:ss format'),
    end_time: Yup.string().required('End time is required').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'End time must be in HH:mm:ss format'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    const [springFall, year] = values.springFallYear.split(',');

    const payload = {
      ...values,
      springFall,
      year,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      const response = await fetch('http://localhost:3001/api/adminPanel/availableRooms/addavailablerooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Available Room added successfully');
        resetForm();
        setStartTime('00:00:00'); // Reset to default
        setEndTime('00:00:00'); // Reset to default
      } else {
        console.error('Failed to add Available Room');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const incrementTime = (time, type) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    let newTime;

    if (type === 'start') {
      newTime = hours === 23 ? '00:00:00' : `${(hours + 1) % 24}:00:00`; // Increment by one hour
      setStartTime(newTime);
    } else {
      newTime = hours === 23 ? '00:00:00' : `${(hours + 1) % 24}:00:00`; // Increment by one hour
      setEndTime(newTime);
    }
  };

  const decrementTime = (time, type) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    let newTime;

    if (type === 'start') {
      newTime = hours === 0 ? '23:00:00' : `${(hours - 1 + 24) % 24}:00:00`; // Decrement by one hour
      setStartTime(newTime);
    } else {
      newTime = hours === 0 ? '23:00:00' : `${(hours - 1 + 24) % 24}:00:00`; // Decrement by one hour
      setEndTime(newTime);
    }
  };

  return (
    <Formik
      initialValues={{ springFallYear: '', room_number: '', department: '', start_time: startTime, end_time: endTime }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Available Rooms</Typography>

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
                  springFallOptions.map((option, index) => (
                    <MenuItem key={index} value={`${option.springFall},${option.year}`}>
                      {`${option.springFall} ${option.year}`}
                    </MenuItem>
                  ))
                )}
              </Select>
              {touched.springFallYear && errors.springFallYear && (
                <FormHelperText>{errors.springFallYear}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal" error={touched.room_number && !!errors.room_number}>
              <InputLabel>Room Number</InputLabel>
              <Field
                name="room_number"
                as={Select}
                label="Room Number"
                fullWidth
              >
                {roomNumberOptions.map((room, index) => (
                  <MenuItem key={index} value={room.room_number}>
                    {room.room_number}
                  </MenuItem>
                ))}
              </Field>
              {touched.room_number && errors.room_number && (
                <Typography variant="body2" color="error">
                  {errors.room_number}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal" error={touched.department && !!errors.department}>
              <InputLabel>Department</InputLabel>
              <Field
                name="department"
                as={Select}
                label="Department"
                fullWidth
              >
                {departmentOptions.map((dept, index) => (
                  <MenuItem key={index} value={dept.department}>
                    {dept.department}
                  </MenuItem>
                ))}
              </Field>
              {touched.department && errors.department && (
                <Typography variant="body2" color="error">
                  {errors.department}
                </Typography>
              )}
            </FormControl>

            <Box display="flex" alignItems="center" margin="normal">
              <Field
                as={TextField}
                name="start_time"
                label="Start Time"
                type="time"
                fullWidth
                margin="normal"
                value={startTime}
                error={touched.start_time && !!errors.start_time}
                helperText={touched.start_time && errors.start_time}
                placeholder={touched.start_time && errors.start_time ? errors.start_time : 'HH:mm:ss'}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <Button onClick={() => decrementTime(startTime, 'start')} variant="outlined" sx={{ marginLeft: 1 }}>-</Button>
              <Button onClick={() => incrementTime(startTime, 'start')} variant="outlined" sx={{ marginLeft: 1 }}>+</Button>
            </Box>

            <Box display="flex" alignItems="center" margin="normal">
              <Field
                as={TextField}
                name="end_time"
                label="End Time"
                type="time"
                fullWidth
                margin="normal"
                value={endTime}
                error={touched.end_time && !!errors.end_time}
                helperText={touched.end_time && errors.end_time}
                placeholder={touched.end_time && errors.end_time ? errors.end_time : 'HH:mm:ss'}
                onChange={(e) => setEndTime(e.target.value)}
              />
              <Button onClick={() => decrementTime(endTime, 'end')} variant="outlined" sx={{ marginLeft: 1 }}>-</Button>
              <Button onClick={() => incrementTime(endTime, 'end')} variant="outlined" sx={{ marginLeft: 1 }}>+</Button>
            </Box>

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
              {isSubmitting ? 'Submitting...' : 'Add AvailableRoom'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AvailableRoomForm;
