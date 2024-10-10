import React from 'react';
import { Button, Grid } from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material'; 

const ViewCreateTimetable = ({ handleButtonClick }) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<ScheduleIcon sx={{ fontSize: 30 }} />} 
          onClick={() => handleButtonClick('Create Timetable')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px',
            fontSize: '1.2rem',
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          Create Timetable
        </Button>
      </Grid>
    </Grid>
  );
};

export default ViewCreateTimetable;
