import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'; 
import three from '../images/icp3.jpg';
import four from '../images/icp4.jpg';

const About = () => {
    return (
        <>  

      {/* AboutUs pic and text here start  */}

      <Box
       id="about-section"
      sx={{ flexGrow: 1, px: { xs: 2, md: 10 }, py: { xs: 2, md: 5 } }}>

      {/* About Us Section */}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" >
            <Typography variant='h4' textAlign='center'>
            <p >About us</p>
            </Typography>
            <Typography textAlign='center'>
            <h1>What we are doing</h1>
            </Typography>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <Button
              variant="outlined"
              sx={{
                color: 'black',
                borderColor: 'black',
                mt: 4,
                '&:hover': {
                  background: 'black',
                  color: 'white',
                },
              }}
            >
              Click me
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              filter: 'brightness(70%)',
            }}
          >
            <Box
              component="img"
              src={three}
              alt="Another description of images"
              sx={{
                width: '80%',
                height: 'auto',
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            />
            <Box
              component="img"
              src={four}
              alt="Overlay image description"
              sx={{
                position: 'absolute',
                
                top: '-5%',
                left: '40%',
                width: '55%',
                height: 'auto',
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
      </Box>

        </>
    )
}

export default About
