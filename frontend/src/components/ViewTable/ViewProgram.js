import React from 'react';
import { Button, Grid } from '@mui/material';
import { School as ProgramIcon } from '@mui/icons-material';

const ViewProgram = ({handleButtonClick}) => {
    return (

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<ProgramIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View Program')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px', 
            fontSize: '1.2rem', 
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          View Program
        </Button>
      </Grid>
    </Grid>

    )
}

export default ViewProgram
