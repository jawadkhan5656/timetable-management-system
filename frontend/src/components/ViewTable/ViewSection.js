import React from 'react'
import { Button, Grid } from '@mui/material';
import { ViewModule as SectionIcon } from '@mui/icons-material';

const ViewSection = ({handleButtonClick}) => {
    return (
        <>

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<SectionIcon sx={{ fontSize: 30 }} />}
            onClick={() => handleButtonClick('View Section')}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px 16px', 
              fontSize: '1.2rem', 
              '&:hover': { backgroundColor: 'white', color: 'black' },
            }}
          >
            View Section
          </Button>
        </Grid>
      </Grid>

        </>
    )
}

export default ViewSection
