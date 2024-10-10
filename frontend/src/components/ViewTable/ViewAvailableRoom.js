import React from 'react';
import { Button, Grid } from '@mui/material';
import { MeetingRoom as AvailableRoomIcon } from '@mui/icons-material';


const ViewAvailableRoom = ({handleButtonClick}) => {
    return (

    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<AvailableRoomIcon sx={{ fontSize: 30 }} />}
          onClick={() => handleButtonClick('View AvailableRooms')}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 16px', 
            fontSize: '1.2rem', 
            '&:hover': { backgroundColor: 'white', color: 'black' },
          }}
        >
          View AvailableRooms
        </Button>
      </Grid>
    </Grid>

    )
}

export default ViewAvailableRoom;
