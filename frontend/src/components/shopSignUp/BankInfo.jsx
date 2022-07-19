import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from "../../providers/theme";

const BankInfo = ({ prevStep, nextStep, handleFormData, values }) => {

  const { theme } = useTheme();

  const CssButton = styled(Button)({
    backgroundColor:theme.colorOne,
    color:theme.colorTwo,
    fontWeight:"700",
  })

  return (
    <Container maxWidth="xs">

    <Box sx={{ flexGrow:1 }}>

      <Typography component="h1" variant="h2">
        Bank Info
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
      

      <CssButton              
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={prevStep}
      >
        previous
      </CssButton>

      <CssButton              
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={nextStep}
      >
        next
      </CssButton>
  </Box>
</Container>

  )
}

export default BankInfo