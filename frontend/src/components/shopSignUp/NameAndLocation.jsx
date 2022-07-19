import React from 'react'


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from "../../providers/theme";






const NameAndLocation = ({ nextStep, handleFormData, values }) => {

  const { theme } = useTheme();
 

  const CssTextField = styled(TextField)({
    color:theme.colorOne,
    
    '& label.Mui-focused': {
      color: theme.colorOne,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.colorOne,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.colorOne,
      },
    },
  });

  return (
    <Container maxWidth="xs">

      <Box sx={{ flexGrow:1 }}>

        <Typography component="h1" variant="h2">
          Name and location
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>

            <CssTextField 
              label="Shopname" 
              variant="outlined"
            />
            
          </Grid>

          <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>
            <CssTextField 
              
              label="Shopname" 
              variant="outlined" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>
            <CssTextField 
              label="Shopname" 
              variant="outlined" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12} sx={{textAlign:"center"}}>
            <CssTextField 
              label="Shopname" 
              variant="outlined" 
            />
          </Grid>
        </Grid>

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
  )
}

export default NameAndLocation