          import React from 'react';
          import { Formik, Form, Field } from 'formik';
          import * as Yup from 'yup';
          import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

          const RoomForm = () => {
            // Validation schema for Formik
            const validationSchema = Yup.object({
              room_number: Yup.string().required('Room Number is required'),
              capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be at least 1'),
              department: Yup.string().required("department is required"),
              building: Yup.string().required('Building name is required'),
              is_lab: Yup.boolean().required('Is Lab is required'),
            });

            // Handle form submission
            const handleSubmit = async (values, { setSubmitting, resetForm }) => {
              console.log('Form values:', values);
              const token = localStorage.getItem('token');  // hjgbhibhib
              console.log('Retrieved token:', token); //ikjhuih
            
              if (!token) {
                console.error('No authentication token found.');
                return;
              }  //khiuh

              try {
                // API call to add a room
                const response = await fetch('http://localhost:3001/api/adminPanel/rooms/addroom', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                     token: token  
                  },
                  body: JSON.stringify(values),
                });

                if (response.ok) {
                  console.log('Room added successfully');
                  resetForm();
                } else {
                  console.error('Failed to add room');
                }
              } catch (error) {
                console.error('Error:', error);
              } finally {
                setSubmitting(false);
              }
            };

            return (
              <Formik
                initialValues={{ room_number: '', capacity: '', department: '', building: '', is_lab: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
                      <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>Add Room</Typography>
                      <Field
                        as={TextField}
                        name="room_number"
                        label="room_number"
                        fullWidth
                        margin="normal"
                        error={touched.room_number && !!errors.room_number}
                        helperText={touched.room_number && errors.room_number}
                      />
                      <Field
                        as={TextField}
                        name="capacity"
                        label="Capacity"
                        fullWidth
                        margin="normal"
                        error={touched.capacity && !!errors.capacity}
                        helperText={touched.capacity && errors.capacity}
                      />
                      <Field
                        as={TextField}
                        name="department"
                        label="department"
                        fullWidth
                        margin="normal"
                        error={touched.department && !!errors.department}
                        helperText={touched.department && errors.department}
                      />
                      <Field
                        as={TextField}
                        name="building"
                        label="Building"
                        fullWidth
                        margin="normal"
                        error={touched.building && !!errors.building}
                        helperText={touched.building && errors.building}
                      />

                      <FormControl fullWidth margin="normal" error={touched.is_lab && !!errors.is_lab}>
                        <InputLabel>Is Lab</InputLabel>
                        <Field
                          name="is_lab"
                          as={Select}
                          label="Is Lab"
                          fullWidth
                        >
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
                        </Field>
                        {touched.is_lab && errors.is_lab && (
                          <Typography variant="body2" color="error">
                            {errors.is_lab}
                          </Typography>
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
                            color: 'white'
                          }
                        }}
                      >
                        Add Room
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            );
          };

          export default RoomForm;
