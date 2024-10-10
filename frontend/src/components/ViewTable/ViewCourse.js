import React from 'react';
import { Button, Grid } from '@mui/material';
import {Book as CourseIcon} from '@mui/icons-material';

const ViewCourse = ({handleButtonClick}) => {
    return (
        <>

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<CourseIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View Courses')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px', 
            fontSize: '1.2rem', 
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          View Courses
        </Button>
      </Grid>
    </Grid>
    
        </>
    )
}

export default ViewCourse
