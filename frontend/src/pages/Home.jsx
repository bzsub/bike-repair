import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";


const Home = () => {
    const { auth, user } = useAuth();
    const { theme } = useTheme();


    return (
        <Container component="main" maxWidth="xs" sx={{
            textAlign:"center",
        }}>
            <Typography component="p" variant="h2">
                Welcome to bike-repair
            </Typography>

            <Typography component="p" variant="h5" sx={{mt:4}}>
                The best bike repair site under development :D
            </Typography>

            {
                !user && <>
                    <Typography component="p" variant="h5">
                        To book a repair please log in
                    </Typography>

                    <Button 
                        fullWidth
                        onClick={auth} 
                        sx={{
                            backgroundColor:theme.colorOne,
                            color:theme.colorTwo,
                            padding: "0.7rem 0",
                            mt:2,
                        }}
                    >
                        Google login
                    </Button>
                </>
            }
            

        </Container>
    )
}

export default Home