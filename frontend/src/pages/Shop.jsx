import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import { todoApi } from "../api/todoApi";


import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Shop = () => {
    let params = useParams()
    let navigate = useNavigate()
    
    const { token, user } = useAuth();
    const { theme } = useTheme();
    
    const { get } = todoApi();

    const [shop, setShop] = useState("")
    const [repairs, setRepairs] = useState([])

    const getShopById = async () => {
        const response = await get(`/shop/${params.id}`)
        console.log(response.data);
        setShop(response.data)
    }

    // const getRepairsToShop = async () => {
    //     const response = await get(`/repairs/shop/${params.id}`)
    //     console.log(response.data);
    //     setRepairs(response.data)
    // }

    useEffect(() => {
        getShopById()
    },[])

    return (
        <Container component="main" maxWidth="xs" sx={{
            textAlign:"center",
        }}>

            <ArrowCircleLeftIcon sx={{fontSize:60, textAlign:"left"}} onClick={() => navigate(`/shopsearch`)}/>       

            {
                shop ? 
                <>
                    <Typography component="p" variant="h2">
                        {shop.shopName}
                    </Typography>
                    <Typography component="p" variant="h2">
                        {shop.phone}
                    </Typography>

                    <Typography component="p" variant="h2">
                        {shop.email}
                    </Typography>

                    <Typography component="p" variant="h2">
                        {shop.locations.street}
                    </Typography>

                    <Typography component="p" variant="h2">
                        {shop.locations.streetNum}
                    </Typography>

                    <Typography component="p" variant="h2">
                        {shop.bankInfo.bankName}
                    </Typography>

                    <Typography component="p" variant="h2">
                        {shop.bankInfo.IBAN}
                    </Typography>

                    <Typography component="p" variant="h2">
                        ratings:
                    </Typography>
                    {
                        repairs.length > 0 ? 
                            repairs.map(repair => <Typography component="p" variant="h2">
                            ratings:
                            </Typography>) : 
                            <Typography component="p" variant="h2">
                                Noone rated this shop yet, be the first!
                            </Typography>
                    }

                    <Button 
                        fullWidth
                        variant="contained"
                        onClick={() => navigate('/book')} 
                        sx={{
                            backgroundColor:theme.colorOne,
                            color:theme.colorTwo,
                            mt:2,
                        }}
                    >
                        Book a repair
                    </Button>
                    
                </> :
                <Typography component="p" variant="h2">
                    we couldn't find the shop you're looking for
                </Typography>
            }

        </Container>
    )
}

export default Shop