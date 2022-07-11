import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import BuildIcon from '@mui/icons-material/Build';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const Input = styled('input')({
  display: 'none',
});


const Register = () => {
  
    const navigate = useNavigate();
    const { registerUser, registerShop, user } = useAuth();

    const [username, setUsername] = useState("");
    const [entity, setEntity] = useState("user");

    const [flatTire, setFlatTire] = useState("")
    const [chainSwap, setChainSwap] = useState("")
    const [wheelSwap, setWheelSwap] = useState("")

    useEffect(() => {
        if (user.userId) navigate("/profile");
        // eslint-disable-next-line
    }, [user]);

return (
    <Container component="main" maxWidth="xs">

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                { entity === 'user' ? <DirectionsBikeIcon/> : <BuildIcon/> }
            </Avatar>

            <Typography component="h1" variant="h5">
                { entity === 'user' ? "Biker Sign up" : "Shop Sign up" }
            </Typography>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>

                <Typography 
                    onClick={() => setEntity(entity === "user" ? "shop" : "user")}
                    variant="subtitle1" 
                    gutterBottom 
                    component="div"
                >
                    { entity === 'user' ? "Sign up as Reapair shop" : "Sign up as User" }
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
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                {/* <label htmlFor="icon-button-file">
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
                </label> */}

                {
                    entity === "shop" && <>
                    <Typography component="h1" variant="h5">
                        Prices:
                    </Typography>
                        <TextField
                            id="outlined-number"
                            label="flat-tire"
                            type="number"
                            value={flatTire}
                            onChange={e => setFlatTire(e.target.value)}
                            
                        />
                        <TextField
                            id="outlined-number"
                            label="chain-swap"
                            type="number"
                            value={chainSwap}
                            onChange={e => setChainSwap(e.target.value)}
                        />
                        <TextField
                            id="outlined-number"
                            label="wheel-swap"
                            type="number"
                            value={wheelSwap}
                            onChange={e => setWheelSwap(e.target.value)}
                            
                        />
                    </>
                }

                <Button
                    
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => entity === "user" ? 
                        registerUser(username) : 
                        registerShop(username, {
                        flatTire,
                        chainSwap,
                        wheelSwap
                        }
                    )}
                >
                    { entity === 'user' ? "Sign up as User" : "Sign up as Reapair shop" }
                </Button>

            </Box>
            
        </Box>
        
    </Container>
)};

export default Register;