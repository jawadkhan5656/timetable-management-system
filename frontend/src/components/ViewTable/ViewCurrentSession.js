import React from 'react';
import { Button, Grid } from '@mui/material';
import { Event as CurrentSessionIcon } from '@mui/icons-material';

const ViewCurrentSession = ({ handleButtonClick }) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<CurrentSessionIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View CurrentSession')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px',
            fontSize: '1.2rem',
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          View CurrentSession
        </Button>
      </Grid>
    </Grid>
  );
};

export default ViewCurrentSession;
