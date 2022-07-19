import React, { useState } from 'react'
import validator from "validator";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const PricesAndServices = ({ prevStep, nextStep, handleFormData, values }) => {
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
    <Container maxWidth="xs" style={{transition:"0.5s"}}>

    <Box sx={{ flexGrow:1 }}>

      <Typography component="h1" variant="h2">
        Prices and Services
      </Typography>

      <Grid container spacing={2}>

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
        </Grid>
      </Grid>
      

      <Button              
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={prevStep}
      >
        previous
      </Button>

      <Button              
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={nextStep}
      >
        next
      </Button>
  </Box>
</Container>

)}

export default PricesAndServices