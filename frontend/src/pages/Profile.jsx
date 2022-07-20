import { React, useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
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
  const { theme } = useTheme();
  const { get, del, update } = todoApi();

  // FOR USER
  const [username, setUsername] = useState("")
  
  // FOR SHOP
  const [shopInfo, setShopInfo] = useState("")

  const getOneEntity = async () => {
    const response = await get(`/${user.entity}/${user.userId}`)
    console.log(response.data);
    user.entity === "user" ? 
    setUsername(response.data.username) :
    setShopInfo(response.data)
    console.log(shopInfo)
  }

  const handleUpdate = async () => {
    const data = user.entity === "user" ? 
      {username} : 
      {...shopInfo}
    const response = await update(`/${user.entity}/${user.userId}`, data)
    console.log(response.data);
  }

  const handleDelete = async () => {
    const response = await del(`/${user.entity}/${user.userId}`)
    logout()
    console.log(response.data);
  }

  useEffect(() => {
    getOneEntity()
  }, [token])
  

return (
  <Container component="main" maxWidth="xs">
    <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
      

      {
        user?.entity === "user" ? <>
          <Typography component="h1" variant="h2">
            User Profile
          </Typography>

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
        </>
        : user?.entity === "shop" && shopInfo ?
        <>
        <Typography component="h1" variant="h2">
          Shop Profile
        </Typography>
          <Typography component="h1" variant="h6" sx={{ textAlign: "left", mt:3 }}>
            Basic info:
          </Typography>

          <TextField 
            fullWidth
            label="shopname"
            sx={{mt:2}}
            value={shopInfo.shopName}
            onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, shopName: e.target.value}))}
          />
          <TextField 
            fullWidth
            label="email"
            type="email"
            sx={{mt:2}}
            value={shopInfo.email}
            onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, email: e.target.value}))}
          />
          <TextField 
            fullWidth
            label="phone"
            type="number"
            sx={{mt:2}}
            value={shopInfo.phone}
            onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, phone: e.target.value}))}
          />

          <Typography component="h1" variant="h6" sx={{ textAlign: "left", mt:3 }}>
            Location info:
          </Typography>

          <TextField 
              fullWidth
              label="zipCode"
              type="number"
              sx={{mt:2}}
              value={shopInfo.locations.zipCode}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, zipCode: e.target.value}}))}
          />

          <TextField 
              fullWidth
              label="city"
              sx={{mt:2}}
              value={shopInfo.locations.city}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, city: e.target.value}}))}
          />

          <TextField 
              fullWidth
              label="street"
              sx={{mt:2}}
              value={shopInfo.locations.street}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, street: e.target.value}}))}
          />

          <TextField 
              fullWidth
              label="streetNum"
              type="number"
              sx={{mt:2}}
              value={shopInfo.locations.streetNum}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, streetNum: e.target.value}}))}
          />

          <TextField 
              fullWidth
              label="apartment"
              sx={{mt:2}}
              value={shopInfo.locations.apartment}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, apartment: e.target.value}}))}
          />

          <Typography component="h1" variant="h6" sx={{ textAlign: "left", mt:3 }}>
            Prices and Services:
          </Typography>

          <TextField 
              fullWidth
              type="number"
              label="flatTire"
              sx={{mt:2}}
              value={shopInfo.prices.flatTire}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, prices: {...prevShopInfo.prices, flatTire: e.target.value}}))}
          />
          <TextField 
              fullWidth
              type="number"
              label="chainSwap"
              sx={{mt:2}}
              value={shopInfo.prices.chainSwap}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, prices: {...prevShopInfo.prices, chainSwap: e.target.value}}))}
          />
          <TextField 
              fullWidth
              type="number"
              label="wheelSwap"
              sx={{mt:2}}
              value={shopInfo.prices.wheelSwap}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, prices: {...prevShopInfo.prices, wheelSwap: e.target.value}}))}
          />
          <Typography component="h1" variant="h6" sx={{ textAlign: "left", mt:3 }}>
            Bank info:
          </Typography>

          <TextField 
              fullWidth
              label="bankName"
              sx={{mt:2}}
              value={shopInfo.bankInfo.bankName}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, bankInfo: {...prevShopInfo.bankInfo, bankName: e.target.value}}))}
          />
          <TextField 
              fullWidth
              label="IBAN"
              type="number"
              sx={{mt:2}}
              value={shopInfo.bankInfo.IBAN}
              onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, bankInfo: {...prevShopInfo.bankInfo, IBAN: e.target.value}}))}
          />
        </> 
        : <Typography>please log in</Typography>
      }

      <Button              
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}
          onClick={handleUpdate}
      >
          Update
      </Button>

      <Button              
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}
          onClick={handleDelete}
      >
          Delete
      </Button>

    </Box>
  </Container>
)};

export default Profile;
