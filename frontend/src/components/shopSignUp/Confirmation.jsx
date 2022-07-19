import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from "../../providers/theme";


const Confirmation = ({ prevStep, handleFormData, values }) => {
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
        Confirmation
      </Typography>

      <Typography component="" variant="h2">
        text1
      </Typography>

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
        onClick={() => console.log(values)}
      >
        Sign up as Repair Shop
      </CssButton>
  </Box>
</Container>
  )
}

export default Confirmation