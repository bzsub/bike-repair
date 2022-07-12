import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Confirmation = ({ prevStep, handleFormData, values }) => {
  return (
    <Container maxWidth="xs">

    <Box sx={{ flexGrow:1 }}>

      <Typography component="h1" variant="h2">
        Confirmation
      </Typography>

      <Typography component="" variant="h2">
        text1
      </Typography>
      
      

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
        onClick={() => console.log(values)}
      >
        next
      </Button>
  </Box>
</Container>
  )
}

export default Confirmation