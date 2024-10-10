import React, { useState } from 'react'; 
import { AppBar, Box, Button, Drawer, IconButton, Modal, Toolbar, Typography,  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginForm from '../LoginForm';
import '../../styles/HomeStyle.css';
import SchoolIcon from '@mui/icons-material/School';


const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false); 
    const [loginOpen, setLoginOpen] = useState(false); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleScrollToSection = (id) => {
        const element = document.getElementById(id); 
        if(element) {
            element.scrollIntoView({ 
                behavior: 'smooth'
            }); 
        }
    }; 

    const handleLoginOpen = () => {
        setLoginOpen(true);
    }; 

    const handleLoginClose = () => {
        setLoginOpen(false); 
    };

    // Validation function for inputs
    const validateInputs = () => {
        const nameIsValid = /^[A-Z][a-zA-Z]*$/.test(name); // Name starts with a capital letter
        const emailIsValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email); // Basic email validation
        const passwordIsValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(password); // At least 7 characters, including letters and numbers
        return nameIsValid && emailIsValid && passwordIsValid;
    };


    const drawer = (
    <Box onClick={handleDrawerToggle} 
    sx={{ textAlign: 'center',  backgroundColor: 'black', color: 'white', height: '100%', py: 2  }}>
     
        <ul className='mobile-navigation'>
            <li>
            <Button onClick={() => handleScrollToSection('home-section')} sx={{color: 'white'}}>Home</Button>
        </li>
        <li>
            <Button onClick={() => handleScrollToSection('about-section')} sx={{color: 'white'}}>About</Button>
        </li>
        <li>
            <Button onClick={() => handleScrollToSection('timetable-section')} sx={{color: 'white'}}>Timetable</Button>
        </li>
        <li>
            <Button onClick={() => handleScrollToSection('blogs-section')} sx={{color: 'white'}}>Blogs</Button>
        </li>
        <li>
            <Button
                onClick={handleLoginOpen}
                sx={{ color: 'white',  } }
                disabled={!validateInputs}  // Disable if inputs are invalid
            >
                {/* this is the samll screen resolution login button  */}
                Login 
            </Button>
        </li>
       </ul>
    </Box>
    );

    return (
    <>
    <Box>
        <AppBar component='nav' sx={{bgcolor: 'black'}}>
            <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' edge='start' sx={{mr:2, display: {sm: 'none'}}} 
                onClick={handleDrawerToggle}
            >
               
                <MenuIcon />
            </IconButton>

            <SchoolIcon sx={{ mr: 1, color: 'goldenrod'}} />
            <Typography
            variant="h6"
            component="div"
                sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, color: 'goldenrod' }}
            >
                Islamia College
            </Typography>
            
            <Box sx={{ display: {xs: 'none', sm: 'block' } }}>
            <ul className='navigation-menu'>
            <li>
                <Button sx={{ color: 'white', '&:hover': {color: 'goldenrod'}} } onClick={() => handleScrollToSection('home-section')}>Home</Button>
            </li>
            <li>
                <Button sx={{ color: 'white', '&:hover': {color: 'goldenrod'}} } onClick={() => handleScrollToSection('about-section')}>About</Button>
            </li>
            <li>
                <Button sx={{color: 'white', '&:hover': {color: 'goldenrod'}}} onClick={() => handleScrollToSection('timetable-section')}>Timetable</Button>
            </li>
            <li>
                <Button sx={{color: 'white', '&:hover': {color: 'goldenrod'}}} onClick={() => handleScrollToSection('blogs-section')}>Blogs</Button>
            </li>
            <li>
                <Button
                    onClick={handleLoginOpen}
                    variant='contained'
                    sx={{ backgroundColor: 'goldenrod', color: 'white', '&:hover': { backgroundColor: 'darkgoldenrod' } }}
                    disabled={false} // Disable if inputs are invalid
                >
                    Login
                </Button>
            </li>
            </ul>
            </Box>
        </Toolbar>
        </AppBar>
        <Box component='nav'>
            <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} sx={{display:  {xs: 'block', sm: 'none'}, 
             '& .MuiDrawer-paper': {boxSizing: 'border-box', width: '250px', top: '56px', backgroundColor: 'black' }
            }}>
                {drawer}
            </Drawer>
        </Box>
    </Box>
    <Modal open={loginOpen} onClose={handleLoginClose}>
    <Box 
        sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            backgroundImage: 'url(/path/to/your/background-image.jpg)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            minHeight: '100vh'
              }}
            >
            <LoginForm 
             onClose={handleLoginClose} 
             setName={setName}
             setEmail={setEmail}
             setPassword={setPassword} 
            /> {/* Ensure onClose is passed here */}
            
    </Box>
    </Modal>
    </>
    );
};

export default Header;
