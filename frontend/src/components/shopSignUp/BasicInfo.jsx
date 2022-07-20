import React, { useState } from 'react'


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from "../../providers/theme";
import { useAuth } from "../../providers/auth";
import BuildIcon from '@mui/icons-material/Build';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';



const BasicInfo = ({ nextStep, shopInfo, setShopInfo, entity, setEntity }) => {
  
  const { theme } = useTheme();

  const { registerUser } = useAuth();

  const [username, setUsername] = useState("");


  return (
    <Container maxWidth="xs">

      <Grid container justifyContent="flex-end" sx={{ mt: 5 }}>
        <Typography 
          sx={{
            display:"flex",
            alignItems:"center"
          }}
          onClick={() => setEntity(entity === "user" ? "shop" : "user")}
        >
            { entity === 'user' ? "Sign up as a Reapair shop" : "Sign up as a Biker" }
            <ChevronRightIcon sx={{fontSize:40}}/>
        </Typography>
      </Grid>

      { 
      // USER VIEW
        entity === "user" ? 
        <Box sx={{ flexGrow:1, textAlign: "center" }}>

          <DirectionsBikeIcon sx={{fontSize:60,mt:3}}/>      

          <Typography component="h1" variant="h3" sx={{mt:2}} >
            Biker Sign up
          </Typography>

              <TextField
                  label="username"
                  sx={{mt:3}}
                  value={username}
                  fullWidth
                  onChange={e => setUsername(e.target.value)}
              />

              <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}
                  onClick={() => registerUser(username)}
              >
                Sign up as a Biker
              </Button>  
        </Box>

        :
        // SHOP VIEW
        <Box sx={{ flexGrow:1, textAlign: "center" }}>

          <BuildIcon sx={{fontSize:60,mt:3}}/>      

          <Typography component="h1" variant="h3" sx={{mt:2}} >
            Shop Sign up
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

            {/* <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>
              <TextField 
                label="Shopname" 
                variant="outlined" 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>
              <TextField 
                label="Shopname" 
                variant="outlined" 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>
              <TextField 
                label="Shopname" 
                variant="outlined" 
              />
            </Grid> */}

          <Button              
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}
            onClick={nextStep}
          >
            next
          </Button>
        </Box>
      }
  </Container>
  )
}

export default BasicInfo