import React from 'react';
import { Button, Grid } from '@mui/material';
import { Event as SessionIcon } from '@mui/icons-material';

const ViewSession = ({handleButtonClick}) => {
  return (
 

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SessionIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View Session')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px', 
            fontSize: '1.2rem', 
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          View Session
        </Button>
      </Grid>
    </Grid>
      

  )
}

export default ViewSession
