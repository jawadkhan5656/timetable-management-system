import React from 'react';
import { Button, Grid } from '@mui/material';
import { Subject as OfferedSubjectIcon } from '@mui/icons-material';

const ViewOfferedSubject = ({handleButtonClick}) => {
    return (
        <>

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<OfferedSubjectIcon sx={{ fontSize: 30 }} />}
            onClick={() => handleButtonClick('View OfferedSubject')}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px 16px', 
              fontSize: '1.2rem', 
              '&:hover': { backgroundColor: 'white', color: 'black' },
            }}
          >
            View OfferedSubject
          </Button>
        </Grid>
      </Grid>

        </>
    )
}

export default ViewOfferedSubject
