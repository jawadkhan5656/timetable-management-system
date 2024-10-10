import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { School as SchoolIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ViewButtonsGrid from '../components/ViewTable/ViewButtonsGrid';

import RoomForm from '../components/Form/RoomForm';
import RoomTable from '../components/Form/RoomTable';
import CourseForm from '../components/Form/CourseForm';
import CourseTable from '../components/Form/CourseTable';
import TeacherForm from '../components/Form/TeacherForm';
import TeacherTable from '../components/Form/TeacherTable';
import DepartmentForm from '../components/Form/DepartmentForm';
import DepartmentTable from '../components/Form/DepartmentTable';
import SessionForm from '../components/Form/SessionForm';
import SessionTable from '../components/Form/SessionTable';
import ProgramForm from '../components/Form/ProgramForm';
import ProgramTable from '../components/Form/ProgramTable';
import AvailableRoomForm from '../components/Form/AvailableRoomForm';
import AvailableTable from '../components/Form/AvailableTable';
import SectionForm from '../components/Form/SectionForm';
import SectionTable from '../components/Form/SectionTable';
import CurrentSessionForm from '../components/Form/CurrentSessionForm';
import CurrentSessionTable from '../components/Form/CurrentSessionTable';
import OfferedSubjectForm from '../components/Form/OfferedSubjectForm';
import OfferedSubjectTable from '../components/Form/OfferedSubjectTable';
import CreateTimeTableForm from '../components/Form/CreateTimeTableForm';
import TeacherTableForm from '../components/Form/TeacherTableForm';


const menuItems = [
  { label: 'Add Rooms', path: '/admin/add-room' },
  { label: 'Add Course', path: '/admin/add-course' },
  { label: 'Add Teacher', path: '/admin/add-teacher' },
  { label: 'Add Department', path: '/admin/add-department' },
  { label: 'Add Session', path: '/admin/add-session' },
  { label: 'Add Program', path: '/admin/add-program' },
  { label: 'Add Available Rooms', path: '/admin/add-available-rooms' },
  { label: 'Add Section', path: '/admin/add-section' },
  { label: 'Add Current Session', path: '/admin/add-current-session' },
  { label: 'Add Offered Subject', path: '/admin/add-offered-subject' },
  { label: 'Create Timetable', path: '/admin/create-timetable' },
  { label: 'TeacherTableForm', path: '/admin/TeacherTableForm' },
];

const Admin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [rooms, setRooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [department, setDepartment] = useState([]);
  const [session, setSession] = useState([]);
  const [program, setProgram] = useState([]);
  const [availableRoom, setAvailableRoom] = useState([]);
  const [section, setSection] = useState([]);
  const [currentSession, setCurrentSession] = useState([]);
  const [offeredSubject, setOfferedSubject] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  

  // Check if user is logged in based on local storage or token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogin = () => {
    // Simulate login action for testing purposes
    localStorage.setItem('token', 'sampleToken');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear authentication token
    setIsLoggedIn(false); // Update login state
    navigate('/'); // Redirect to home/login page
  };


  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item.label);
  };

  const handleAddRoom = (values, { setSubmitting, resetForm }) => {
    fetch('http://localhost:3001/api/adminPanel/rooms/addroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        setRooms([...rooms, data]);
        resetForm();
      })
      .catch(error => console.error('Error:', error))
      .finally(() => setSubmitting(false));
  };

  const handleDeleteRoom = (roomId) => {
    fetch(`http://localhost:3001/api/adminPanel/rooms/deleteroom/${roomId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setRooms(rooms.filter((room) => room.id !== roomId));
        } else {
          console.error('Failed to delete room');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleAddCourse = (values, { setSubmitting, resetForm }) => {
    setCourses([...courses, values]);
    resetForm();
    setSubmitting(false);
  };

  const handleAddTeacher = (values, { setSubmitting, resetForm }) => {
    setTeachers([...teachers, values]);
    resetForm();
    setSubmitting(false);
  };

  const handleAddDepartment = (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3001/api/adminPanel/department/adddepartment', values, {
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
    })
    .then(response => {
        setDepartment([...department, response.data]);
        resetForm();
    })
    .catch(error => {
        console.error('Error adding department:', error);
        alert(error.response ? error.response.data : 'Error adding department.');
    })
    .finally(() => setSubmitting(false));
};


const handleAddSession = (values, { setSubmitting, resetForm }) => {
  const token = localStorage.getItem('token');
  axios.post(' http://localhost:3001/api/adminPanel/session/addsession', values, {
      headers: {
          'Content-Type': 'application/json',
          token: token,
      },
  })
  .then(response => {
      setSession([...session, response.data]);
      resetForm();
  })
  .catch(error => {
      console.error('Error adding department:', error);
      alert(error.response ? error.response.data : 'Error adding department.');
  })
  .finally(() => setSubmitting(false));
};


  const handleAddProgram = (values, { setSubmitting, resetForm }) => {
    setProgram([...program, values]);
    resetForm();
    setSubmitting(false);
  };

  const handleAddAvailableRoom = (values, { setSubmitting, resetForm }) => {
    setAvailableRoom([...availableRoom, values]);
    resetForm();
    setSubmitting(false);
  };

  const handleAddSection = (values, { setSubmitting, resetForm }) => {
    setSection([...section, values]);
    resetForm();
    setSubmitting(false);
  };

  const handleAddCurrentSession = (values, { setSubmitting, resetForm }) => {
    setCurrentSession([...currentSession, values]);
    resetForm();
    setSubmitting(false);
  };

  const handleAddOfferedSubject = (values, { setSubmitting, resetForm }) => {
    setOfferedSubject([...offeredSubject, values]);
    resetForm();
    setSubmitting(false);
  };

  

  const handleButtonClick = (action) => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);
  
    if (!token) {
      console.error('No authentication token found.');
      return;
    }
  
    if (action === 'View Rooms') {
      axios.get('http://localhost:3001/api/adminPanel/rooms/allrooms', {
        headers: {
          token: token,
        },
      })
        .then(response => {
          const data = response.data;
          setRooms(data);
          setSelectedMenuItem('View Rooms'); // Set selected menu item
        })
        .catch(error => {
          console.error('Error fetching rooms:', error);
        });
    } else if (action === 'View Courses') {
      axios.get('http://localhost:3001/api/adminPanel/courses/allcourses', {
        headers: {
          token: token,
        },
      })
        .then(response => {
          const data = response.data;
          setCourses(data);
          setSelectedMenuItem('View Courses'); // Set selected menu item
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    } else if (action === 'View Teacher') {
      axios.get('http://localhost:3001/api/adminPanel/teachers/allteachers', {
        headers: {
          token: token,
        },
      })
        .then(response => {
          const data = response.data;
          setTeachers(data);
          setSelectedMenuItem('View Teacher'); // Set selected menu item
        })
        .catch(error => {
          console.error('Error fetching teachers:', error);
        });
    }  else if (action === 'View Department') {
      axios.get('http://localhost:3001/api/adminPanel/department/alldepartments', {
        headers: {
          token: token,
        },
      })
        .then(response => {
          const data = response.data;
          setDepartment(data);
          setSelectedMenuItem('View Department'); // Set selected menu item
        })
        .catch(error => {
          console.error('Error fetching Department:', error);
        });
    }  else if (action === 'View Session') {
      axios.get('http://localhost:3001/api/adminPanel/session/allsessions', {
        headers: {
          token: token,
        },
      })
        .then(response => {
          const data = response.data;
          setSession(data);
          setSelectedMenuItem('View Session'); // Set selected menu item
        })
        .catch(error => {
          console.error('Error fetching Sessions:', error);
        });
  }   else if (action === 'View Program') {
    axios.get(' http://localhost:3001/api/adminPanel/programs/allprograms', {
      headers: {
        token: token,
      },
    })
      .then(response => {
        const data = response.data;
        setProgram(data);
        setSelectedMenuItem('View Program'); // Set selected menu item
      })
      .catch(error => {
        console.error('Error fetching Program:', error);
      });
        
}   else if (action === 'View AvailableRooms') {
  axios.get(' http://localhost:3001/api/adminPanel/availableRooms/allavailablerooms', {
    headers: {
      token: token,
    },
  })
    .then(response => {
      const data = response.data;
      setAvailableRoom(data);
      setSelectedMenuItem('View Available Rooms'); // Set selected menu item
    })
    .catch(error => {
      console.error('Error fetching AvailableRooms:', error);
    });

   } else if (action === 'View Section') {
      axios.get(' http://localhost:3001/api/adminPanel/section/allsections', {
        headers: {
          token: token,
        },
      })
        .then(response => {
          const data = response.data;
          setSection(data);
          setSelectedMenuItem('View Section'); // Set selected menu item
        })
        .catch(error => {
          console.error('Error fetching Sections', error);
        });

  }  else if (action === 'View CurrentSession') {
    axios.get('http://localhost:3001/api/adminPanel/semester/allsemesters', {
        headers: {
            token: token,
        },
    })
    .then(response => {
        console.log('API response:', response.data); // Log the response
        const data = response.data;
        setCurrentSession(data); // Set state with the fetched data
        console.log('current session data:', data)
        setSelectedMenuItem('View Current Session'); // Set selected menu item
    })
    .catch(error => {
        console.error('Error fetching CurrentSessions:', error.response ? error.response.data : error.message);
    });


}    else if (action === 'View OfferedSubject') {
  axios.get('http://localhost:3001/api/adminPanel/offeredsubjects/allofferedsubjects', {
      headers: {
          token: token,
      },
  })
  .then(response => {
      console.log('API response:', response.data); // Log the response
      const data = response.data;
      setOfferedSubject(data); // Set state with the fetched data
      console.log('Offered Subjects data:', data)
      setSelectedMenuItem('View Offered Subject'); // Set selected menu item
  })
  .catch(error => {
      console.error('Error fetching OfferedSubjects:', error.response ? error.response.data : error.message);
  }); 
// }   else if(action === 'ViewCreateTimetable') {
//   axios.get('', {
    
//   })
//   .then(response => {
//     const data = response.data;
//     CreateTimeTableForm(data);
//     // setSelectedMenuItem(ViewCreateTimetable);
//   })
//   .catch(error => {
//     console.error('Error fetching Create Timetable', error);
//   })
// }

  }
}


  // changes here  
  
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'black', zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="goldenrod" component="div" sx={{ flexGrow: 1 }}>
            <SchoolIcon />
            Islamia College
          </Typography>

          {isLoggedIn ? (
            <Button
              color="inherit"
              sx={{
                backgroundColor: 'gold',
                color: 'black',
                '&:hover': { backgroundColor: 'darkgoldenrod' },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{
                backgroundColor: 'gold',
                color: 'black',
                '&:hover': { backgroundColor: 'darkgoldenrod' },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          )}

        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex' }}>
       

      {isLoggedIn && (
          <Drawer
            variant={isSmallScreen ? 'temporary' : 'permanent'}
            open={isSmallScreen ? drawerOpen : true}
            onClose={handleDrawerToggle}
            sx={{
              width: 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 240,
                boxSizing: 'border-box',
                backgroundColor: 'black',
                color: 'white',
              },
            }}
          >
            <List>
              {menuItems.map((text) => (
                <ListItem
                  button
                  key={text.label}
                  sx={{ '&:hover': { color: 'goldenrod' } }}
                  onClick={() => handleMenuItemClick(text)}
                >
                  <ListItemText primary={text.label} />
                </ListItem>
              ))}
            </List>
          </Drawer> 
      )}

        <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Admin Panel 
          </Typography>

          <ViewButtonsGrid handleButtonClick={handleButtonClick} />

          {selectedMenuItem === 'View Rooms' && (
            <> 
              <RoomTable rooms={rooms} onDeleteRoom={handleDeleteRoom} />
            </>
          )}

          {selectedMenuItem === 'Add Rooms' && <RoomForm onAddRoom={handleAddRoom} />}
          {selectedMenuItem === 'Delete Room' && (
            <>
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
                Select a room to delete
              </Typography>
              <RoomTable rooms={rooms} onDeleteRoom={handleDeleteRoom} />
            </>
          )}

          {selectedMenuItem === 'View Courses' && courses.length > 0 && <CourseTable courses={courses} />}
          {selectedMenuItem === 'Add Course' && <CourseForm onAddCourse={handleAddCourse} />}

          {selectedMenuItem === 'View Teacher' && teachers.length > 0 && (
            <TeacherTable teachers={teachers} />)}
          {selectedMenuItem === 'Add Teacher' && <TeacherForm onAddTeacher={handleAddTeacher} />}
{/*  */}
          {selectedMenuItem === 'View Department' && department && department.length > 0 && <DepartmentTable department={department} />}
          {selectedMenuItem === 'Add Department' && <DepartmentForm onAddDepartment={handleAddDepartment} />}


          {selectedMenuItem === 'View Session' && session.length > 0 && <SessionTable session={session} />}
          {selectedMenuItem === 'Add Session' && <SessionForm onAddSession={handleAddSession} />}

          {selectedMenuItem === 'View Program' && program.length > 0 && <ProgramTable program={program} />}
          {selectedMenuItem === 'Add Program' && <ProgramForm onAddProgram={handleAddProgram} />}

          {selectedMenuItem === 'View Available Rooms' && availableRoom.length > 0 && <AvailableTable availableRoom={availableRoom} />}
          {selectedMenuItem === 'Add Available Rooms' && <AvailableRoomForm onAddAvailableRoom={handleAddAvailableRoom} />}

          {selectedMenuItem === 'View Section' && section.length > 0 && <SectionTable section={section} />}
          {selectedMenuItem === 'Add Section' && <SectionForm onAddSection={handleAddSection} />}

          {selectedMenuItem === 'View Current Session' && currentSession.length > 0 && <CurrentSessionTable currentSession={currentSession} />}
          {selectedMenuItem === 'Add Current Session' && <CurrentSessionForm onAddCurrentSession={handleAddCurrentSession} />}
          {selectedMenuItem === 'View Offered Subject' && offeredSubject.length > 0 && <OfferedSubjectTable offeredSubject={offeredSubject} />}
          {selectedMenuItem === 'Add Offered Subject' && <OfferedSubjectForm onAddOfferedSubject={handleAddOfferedSubject} />}
        
          {selectedMenuItem === 'Create Timetable' && <CreateTimeTableForm onCreateTimetable={CreateTimeTableForm} />}

          {selectedMenuItem === 'TeacherTableForm' && (<TeacherTableForm teachers={teachers} />)}

          {selectedMenuItem === 'View Teacher' && teachers.length > 0 && <TeacherTable teachers={teachers} />}
            {selectedMenuItem === 'View Teacher' && TeacherTable.length > 0 && <TeacherTableForm TeacherTable={TeacherTable} />}

        </Box>
      </Box>
    </>
  );
};

export default Admin;
