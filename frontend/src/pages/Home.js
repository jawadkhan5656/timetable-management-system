import React from 'react'; 
import {Box, Button, Card, CardContent, Grid, Typography  } from '@mui/material'; 
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

import islamia from '../images/icp.jpg';
import three from '../images/icp3.jpg';
import four from '../images/icp4.jpg'
import one from '../images/icp2.jpg';
import About from '../components/About';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';
import Timetable from '../components/Timetable';



const Home = () => {

  return (
    <>
    {/* Home start  */}
    <Box id='home-section'
        sx={{
          position: 'relative', 
          width: '100%', 
          height: 'auto', 
          pt: { xs: 10, md: 12 }, 
          pr: { xs: 2, md: 19 }, 
          pb: { xs: 10, md: 11 }, 
          pl: { xs: 2, md: 17 },   
          overflow: 'hidden',    
        }}
      >
        <Carousel
          showArrows={true}
          autoPlay={true}  // Enable auto play
          infiniteLoop={true}  // Enable infinite loop
          showThumbs={false}
          showStatus={false}
          interval={7000}  // Change slide every 3 seconds
        >
          <Box component="img" src={islamia} alt="description of image"
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px', md: '400px' }, 
              display: 'block',
              filter: 'brightness(50%)',
              borderRadius: 5,
            }}
          />
          <Box component="img" src={three} alt="description of second image"
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px', md: '400px' },
              display: 'block',
              filter: 'brightness(50%)',
              borderRadius: 5,
            }}
          />
          <Box component="img" src={four} alt="description of third image"
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px', md: '400px' },
              display: 'block',
              filter: 'brightness(50%)',
              borderRadius: 5,
            }}
          />
          <Box component="img" src={one} alt="description of fourth image"
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px', md: '400px' },
              display: 'block',
              filter: 'brightness(50%)',
              borderRadius: 5,
            }}
          />
        </Carousel>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            width: '80%', 
            maxWidth: '600px',
            borderRadius: '8px', 
          }}
        >
          <Typography variant="h3"
            sx={{
              fontSize: {
                xs: '1.0rem', 
                sm: '2rem', 
                md: '3rem', 
              },
              lineHeight: '1.2', 
            }}
          >
            <Box component='span' sx={{ color: 'gold' }} >
              Welcome
            </Box> {' '}
            to {' '}
            <Box component='span' sx={{ color: 'gold' }}>
              Islamia
            </Box>
          </Typography>
        </Box>
      </Box>
    {/* Home end  */}

{/* card and pic  */}
    <Box sx={{ flexGrow: 1, px:{ xs:3, md: 10 }, py: { xs: -1, md: 1 } }}>
         <Grid container spacing={4}>
 {/* card */}
           <Grid item xs={12} md={6}>
             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'lightgray', borderRadius: 3, }}>
               <CardContent>
                 <Typography variant="h4" component="div">
                   Card Title
                 </Typography>
                 <Typography variant="body2" >
                   Card content goes here. You can describe something about the image or provide other relevant information.
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </Typography>
                 <Button variant='outlined'
                  sx={{ color: 'black', borderColor: 'black', mt: 2, 
                    '&:hover': {
                        background: 'black', 
                        color: 'white',
                    }
                  }}
                >
                  Click me
                </Button>
              </CardContent>
            </Card>
          </Grid>
{/* picture */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={one}
              alt="Another description of image"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 3,
                filter: 'brightness(70%)'
              }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* End of card and image section */}
      

      {/* render about component here */}
      <About />  

      {/* render Timetable component here */}
      <Timetable />

      {/* render blogs component here */}
      <Blogs />

      {/* render Footer here  */}

     <Box sx={{pt: 4}}>
      <Footer /> 
     </Box>


    </>
  )
}

export default Home
