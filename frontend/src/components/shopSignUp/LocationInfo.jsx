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
import { useAuth } from "../../providers/auth";
import BuildIcon from '@mui/icons-material/Build';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';


const LocationInfo = ({ prevStep, nextStep, shopInfo, setShopInfo }) => {
    const { theme } = useTheme();

    return (
        <Container maxWidth="xs">
            <Box sx={{ flexGrow:1, textAlign: "center" }}>

                <BuildIcon sx={{fontSize:60,mt:3}}/>      

                <Typography component="h1" variant="h3" sx={{mt:2}} >
                    Shop Sign up
                </Typography>

                <Typography component="h1" variant="h6" sx={{ textAlign: "left", mt:3 }}>
                    Location info:
                </Typography>

                <TextField 
                    fullWidth
                    label="zipCode"
                    type="number"
                    sx={{mt:2}}
                    value={shopInfo.locations.zipCode}
                    onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, zipCode: e.target.value}}))}
                />

                <TextField 
                    fullWidth
                    label="city"
                    sx={{mt:2}}
                    value={shopInfo.locations.city}
                    onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, city: e.target.value}}))}
                />

                <TextField 
                    fullWidth
                    label="street"
                    sx={{mt:2}}
                    value={shopInfo.locations.street}
                    onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, street: e.target.value}}))}
                />

                <TextField 
                    fullWidth
                    label="streetNum"
                    type="number"
                    sx={{mt:2}}
                    value={shopInfo.locations.streetNum}
                    onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, streetNum: e.target.value}}))}
                />

                <TextField 
                    fullWidth
                    label="apartment"
                    sx={{mt:2}}
                    value={shopInfo.locations.apartment}
                    onChange={e => setShopInfo(prevShopInfo => ({...prevShopInfo, locations: {...prevShopInfo.locations, apartment: e.target.value}}))}
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
    )
}

export default LocationInfo