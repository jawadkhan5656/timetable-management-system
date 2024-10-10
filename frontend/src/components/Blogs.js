import React from 'react';

import dep1 from '../CardImages/icpdepone.jpg'; 
import dep2 from '../CardImages/icpdeptwo.jpg';
import dep3 from '../CardImages/icpdepthree.jpg';
import dep4 from '../CardImages/icpdepfour.jpg';
import masj from '../CardImages/icpmasfive.jpg';
import dep6 from '../CardImages/icpdepsix.jpg';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';



const Blogs = () => {
    return (
        <>
    
       {/* Add Blogs Here   */}

       <Box id='blogs-section'>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center',   mb: -4, mt: 3 }}>
          Blogs
        </Typography>
        <Box  sx={{ flexGrow: 1, px: { xs: 2, md: 10 }, py: { xs: 2, md: 5 } }}>
        <Grid container spacing={4}>

          {/* First Card */}

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{p: 4}}>
            <Card sx={{ maxWidth: 345, mx: 'auto',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
            }
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={dep1}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Title...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Box>
        </Grid>

        {/* Second Card */}

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{p: 4}}>
          <Card sx={{ maxWidth: 345, mx: 'auto', 
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
            }
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={dep2}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Titlt...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Box>
        </Grid>

        {/* Third Card */}
        
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{p: 4}}>
          <Card sx={{ maxWidth: 345, mx: 'auto', 
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
            }
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={dep3}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Title...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Box>
        </Grid>

        {/* Fourth Card */}

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{p: 4}}>
          <Card sx={{ maxWidth: 345, mx: 'auto', 
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
            }
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={dep4}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Title...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Box> 
        </Grid>

        {/* Fifth Card */}

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{p: 4}}>
          <Card sx={{ maxWidth: 345, mx: 'auto', 
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
            }
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={masj}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Title...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Box>
        </Grid>

        {/* Sixth Card */}

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{p: 4}}>
          <Card sx={{ maxWidth: 345, mx: 'auto', 
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '1.4px 20px rgba(0, 0, 0, 0.2)',
            }
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={dep6}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Title...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Box>
    {/* Blogs and Card here ends  */}

        </>
    )
}

export default Blogs
