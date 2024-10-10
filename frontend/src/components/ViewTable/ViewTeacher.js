import React from 'react';
import { Button, Grid } from '@mui/material';
import {Person as TeacherIcon } from '@mui/icons-material';

const ViewTeacher = ({handleButtonClick}) => {
    return (
        
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<TeacherIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View Teacher')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px', 
            fontSize: '1.2rem', 
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          View Teacher
        </Button>
      </Grid>
    </Grid>

      
    )
}

export default ViewTeacher
