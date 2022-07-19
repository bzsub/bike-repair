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
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import BuildIcon from '@mui/icons-material/Build';



const NameAndLocation = ({ nextStep, handleFormData, values, entity, setEntity }) => {
  
  const { theme } = useTheme();
  const { registerUser, registerShop, user } = useAuth();

  const [username, setUsername] = useState("");
  

  const [shopName, setShopName] = useState("")


  const CssButton = styled(Button)({
    backgroundColor:theme.colorOne,
    color:theme.colorTwo,
    fontWeight:"700",
  })

  return (
    <Container maxWidth="xs">

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

      { 
      // USER VIEW
        entity === "user" ? 
        <Box sx={{ flexGrow:1 }}>

          <Avatar sx={{ m: 1, bgcolor: theme.colorOne, color:theme.colorTwo }}>
              <DirectionsBikeIcon/>
          </Avatar>

          <Typography component="h1" variant="h5">
            Biker Sign up
          </Typography>

              <TextField
                  label="Username" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
              />

              <CssButton
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => registerUser(username)}
              >
                Sign up as a Biker
              </CssButton>  
        </Box>

        :
        // SHOP VIEW
        <Box sx={{ flexGrow:1 }}>

          <Typography component="h1" variant="h2">
            Name and location
          </Typography>

        
              <TextField 
              
                label="shopname"
                value={shopName}
                onChange={e => setShopName(e.target.value)}
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
         

          <CssButton              
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={nextStep}
          >
            next
          </CssButton>
        </Box>
      }
  </Container>
  )
}

export default NameAndLocation