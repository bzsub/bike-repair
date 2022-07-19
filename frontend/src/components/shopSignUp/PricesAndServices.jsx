import React, { useState } from 'react'
import validator from "validator";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from "../../providers/theme";
import BuildIcon from '@mui/icons-material/Build';


const PricesAndServices = ({ prevStep, nextStep, shopInfo, setShopInfo, values }) => {
  const { theme } = useTheme();

  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };



  return (
    <Container maxWidth="xs">
            <Box sx={{ flexGrow:1, textAlign: "center" }}>

                <BuildIcon sx={{fontSize:60,mt:3}}/>      

                <Typography component="h1" variant="h3" sx={{mt:2}} >
                Shop Sign up
                </Typography>
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
                    onClick={nextStep}
                >
                    next
                </Button>
            </Box>
        </Container>

)}

export default PricesAndServices