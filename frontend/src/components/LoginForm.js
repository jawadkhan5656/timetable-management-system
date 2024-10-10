import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginForm = ({ onClose }) => { 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();  

    const handleLoginSuccess = () => {
        navigate('/admin');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3001/api/adminPanel/loginAdmin', {
                email,
                password,
            });
            console.log('Response from server:', response);
    
            const token = response.data.token || response.headers.token;  // Check headers for token
            if (token) {
                localStorage.setItem('token', token);
                console.log('Token stored successfully:', token);
                handleLoginSuccess();
    
                if (onClose) {
                    onClose();
                }
            } else {
                alert('Login failed. Token not received. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };
    
    
    return (
        <>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{ width: 300, padding: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: 3 }}
            >
                <Typography variant='h6'>Login</Typography>
                <TextField 
                    label="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    fullWidth
                    margin='normal'
                />
                <TextField 
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  
                    required
                    fullWidth
                    margin='normal'
                    type="password"
                />
                <Button 
                    type="submit"
                    variant='contained'
                    color='primary'
                    sx={{ marginTop: 2 }}
                >
                    OK
                </Button>
            </Box>
        </>
    );
};

export default LoginForm;
