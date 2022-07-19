import React from 'react'

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


const Confirmation = ({ prevStep, shopInfo, setShopInfo }) => {

  const { theme } = useTheme();

  const { registerShop } = useAuth();

  return (
    <Container maxWidth="xs">
            <Box sx={{ flexGrow:1, textAlign: "center" }}>

                <BuildIcon sx={{fontSize:60,mt:3}}/>      

                <Typography component="h1" variant="h3" sx={{mt:2}} >
                    Shop Sign up
                </Typography>

                <Typography component="h1" variant="h5" sx={{ textAlign: "left", mt:3 }}>
                    Basic info:
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                   shopname: {shopInfo.shopName}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  email: {shopInfo.email}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  phone: {shopInfo.phone}
                </Typography>

                <Typography component="h1" variant="h5" sx={{ textAlign: "left", mt:3 }}>
                  Location info:
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  zipCode: {shopInfo.locations.zipCode}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  city: {shopInfo.locations.city}
                </Typography>
              
                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  street: {shopInfo.locations.street}
                </Typography>
                
                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  streetNum: {shopInfo.locations.streetNum}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  apartment: {shopInfo.locations.apartment}
                </Typography>

                <Typography component="h1" variant="h5" sx={{ textAlign: "left", mt:3 }}>
                  Prices and Services:
                </Typography>
            
                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  flatTire: {shopInfo.prices.flatTire}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  chainSwap: {shopInfo.prices.chainSwap}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  wheelSwap: {shopInfo.prices.wheelSwap}
                </Typography>

                <Typography component="h1" variant="h5" sx={{ textAlign: "left", mt:3 }}>
                  Bank info:
                </Typography>
            
                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  bankName: {shopInfo.bankInfo.bankName}
                </Typography>

                <Typography variant="body1" gutterBottom sx={{ textAlign: "left", mt:3 }}>
                  IBAN: {shopInfo.bankInfo.IBAN}
                </Typography>

            
                
                <Button              
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}                
                    onClick={prevStep}
                >
                    previous
                </Button>

                <Button              
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}                
                    onClick={() => registerShop(shopInfo)}
                >
                    sign up as a repair shop
                </Button>
                
            </Box>
        </Container>
  )
}

export default Confirmation