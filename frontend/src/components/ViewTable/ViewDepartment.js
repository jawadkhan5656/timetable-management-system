import React from 'react';
import { Button, Grid } from '@mui/material';
import { Apartment as DepartmentIcon } from '@mui/icons-material';

const ViewDepartment = ({handleButtonClick}) => {
    return (
      

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<DepartmentIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View Department')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px', 
            fontSize: '1.2rem', 
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        > 
          View Department
        </Button>
      </Grid>
    </Grid>

      
    )
}

export default ViewDepartment
