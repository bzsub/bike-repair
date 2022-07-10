import { React, useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { todoApi } from "../api/todoApi";
import http from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const Input = styled('input')({
  display: 'none',
});

const Profile = () => {
  let navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    
  }, [])
  

return (
  <Container component="main" maxWidth="xs">
      <p>{token ? "Logged in" : "Anonymus"}</p>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <Typography component="h1" variant="h5">
                { user?.entity === 'user' ? "Biker Sign up" : "Shop Sign up" }
            </Typography>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>

                <Typography 
                    
                    variant="subtitle1" 
                    gutterBottom 
                    component="div"
                >
                    { user?.entity === 'user' ? "Sign up as Reapair shop" : "Sign up as User" }
                </Typography>

            </Grid>

            <Box sx={{ mt: 1 }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    
                />

                <label htmlFor="icon-button-file">
                    <Typography 
                        onClick={() => navigate("/")}
                        variant="subtitle1" 
                        gutterBottom 
                        component="div"
                    >
                        Profile pics
                    </Typography>
                    <Input accept="image/*" id="icon-button-file" type="file"/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>

                {
                    user?.entity === "shop" && <>
                    <Typography component="h1" variant="h5">
                        Prices:
                    </Typography>
                        <TextField
                            id="outlined-number"
                            label="flat-tire"
                            type="number" 
                        />

                        <TextField
                            id="outlined-number"
                            label="chain-swap"
                            type="number"
                        />

                        <TextField
                            id="outlined-number"
                            label="wheel-swap"
                            type="number"
                        />
                    </>
                }

                <Button              
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    { user?.entity === 'user' ? "Sign up as User" : "Sign up as Reapair shop" }
                </Button>

            </Box>
            
        </Box>
      </Container>
)};

export default Profile;
