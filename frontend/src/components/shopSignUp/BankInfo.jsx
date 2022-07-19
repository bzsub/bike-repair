import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useTheme } from "../../providers/theme";
import BuildIcon from '@mui/icons-material/Build';


const BankInfo = ({ prevStep, nextStep, shopInfo, setShopInfo }) => {

  const { theme } = useTheme();

  return (
    <Container maxWidth="xs">
      <Box sx={{ flexGrow:1, textAlign: "center" }}>

        <BuildIcon sx={{fontSize:60,mt:3}}/>      

        <Typography component="h1" variant="h3" sx={{mt:2}} >
        Shop Sign up
        </Typography>
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
          
        <Button              
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}                onClick={prevStep}
        >
            previous
        </Button>

        <Button              
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}                onClick={nextStep}
        >
            next
        </Button>
      </Box>
    </Container>
  )
}

export default BankInfo