import { React, useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { todoApi } from "../api/todoApi";

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
  const { token, user, logout } = useAuth();
  const { get, del, update } = todoApi();

  const [username, setUsername] = useState("")

  const [flatTire, setFlatTire] = useState("")
  const [chainSwap, setChainSwap] = useState("")
  const [wheelSwap, setWheelSwap] = useState("")

  const getOneUser = async () => {
    const response = await get(`/${user.entity}/${user.userId}`)
    setUsername(response.data.username)
    setFlatTire(response.data.prices?.flatTire)
    setChainSwap(response.data.prices?.chainSwap)
    setWheelSwap(response.data.prices?.wheelSwap)
  }

  const handleUpdate = async () => {
    const data = user.entity === "user" ? 
      {username} : 
      {
        username,
        "prices": {
          flatTire,
          chainSwap,
          wheelSwap
        }
      }
    const response = await update(`/${user.entity}/${user.userId}`,data)
    console.log(response.data);
  }

  const handleDelete = async () => {
    const response = await del(`/${user.entity}/${user.userId}`)
    logout()
    console.log(response.data);
  }

  useEffect(() => {
    getOneUser()
  }, [token])
  

return (
  <Container component="main" maxWidth="xs">
      {/* <p>{token ? "Logged in" : "Anonymus"}</p>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p> */}
      <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <Typography component="h1" variant="h2">
                Profile
            </Typography>

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

               {/*  <label htmlFor="icon-button-file">
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
                    user?.entity === "shop" && <>
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
                    onClick={handleUpdate}
                >
                    Update
                </Button>

                <Button              
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleDelete}
                >
                    Delete
                </Button>

            </Box>
            
        </Box>
      </Container>
)};

export default Profile;
