import React from 'react';
import { Box, Button, Grid, Link, Typography } from '@mui/material';



const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    return (
        <>

     {/*  Footer Here start  */}

     <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 10 },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Get in Touch
            </Typography>

            <Button
              onClick={scrollToTop}
              sx={{
                backgroundColor: 'gold',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#d4af37', // Darker shade of gold for hover effect
                },
                mt: 2,
              }}
            >
              Scroll to Top
            </Button>

          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>
              Home
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>
              About
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>
              Blogs 
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>
              Contact
            </Link>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Phone: 091-9222093
            </Typography>
            <Typography variant="body2">
              Address: University Road Islamia College Peshawar
            </Typography>
            <Typography>
              Email: registrar@icp.edu.pk
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: 'left',
            mt: { xs: 2, md: 4 },
            pt: { xs: 2, md: 4 },
            borderTop: '2px solid gray',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
        </Box>
        <Typography variant="body2" textAlign='center' >
            © {new Date().getFullYear()} register@icp.edu.pk
          </Typography>
      </Box>
      {/* Footer here End */}

        </>
    )
}

export default Footer
