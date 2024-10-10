import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Register Admin
            await axios.post('http://localhost:3001/api/adminPanel/registerAdmin', {
                email,
                password,
            });

            alert('Registration successful. You can now log in.');

            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ width: 300, padding: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: 3 }}
        >
            <Typography variant='h6'>Register</Typography>
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
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
