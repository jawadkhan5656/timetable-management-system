    import React from 'react';
    import { Grid } from '@mui/material';

    import ViewRoom from './ViewRoom';
    import ViewCourse from './ViewCourse';
    import ViewTeacher from './ViewTeacher';
    import ViewDepartment from './ViewDepartment';
    import ViewSession from './ViewSession';
    import ViewProgram from './ViewProgram';
    import ViewAvailableRoom from './ViewAvailableRoom';
    import ViewSection from './ViewSection';
    import ViewOfferedSubject from './ViewOfferedSubject';
    import ViewCurrentSession from './ViewCurrentSession';

    const ViewButtonsGrid = ({ handleButtonClick }) => {
        return (
        <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ mt: -4 }}>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewRoom handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center'  }}>
            <ViewCourse handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewTeacher handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewDepartment handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewSession handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewProgram handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewAvailableRoom handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewSection handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewOfferedSubject handleButtonClick={handleButtonClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ViewCurrentSession handleButtonClick={handleButtonClick} />
            </Grid>
        </Grid>
        );
    };

    export default ViewButtonsGrid;
