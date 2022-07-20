import React, { useState, useEffect } from 'react'
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import { todoApi } from "../api/todoApi";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AlertDialog from "../components/AlertDialog";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';



const ShopSearch = () => {
    let navigate = useNavigate();
    const { user, token } = useAuth();
    const { theme } = useTheme();
    const { get } = todoApi();

    const [searchWord, setSearchWord] = useState("")
    const [shopList, setShopList] = useState([])
    
    const getAllShops = async () => {
        const response = await get(`/shop`)
        console.log(response.data)
        setShopList(response.data)
    }

    useEffect(() => {
        getAllShops()
    }, [])
    

    return (
        <Container component="main" maxWidth="xs" sx={{
            textAlign:"center",
        }}>
            <Typography component="p" variant="h2">
                Shop search
            </Typography>
            <TextField
              fullWidth
              label="search shop by name"
              type="text"
              value={searchWord}
              sx={{ input: { color: theme.colorOne } }}
              onChange={e => setSearchWord(e.target.value)}
          />
          {
            shopList.length > 0 && shopList.filter(shop => shop.shopName.includes(searchWord)).map(shop => <Grid 
                container 
                spacing={2} 
                sx={{
                  border: "2px solid " + theme.colorOne,
                  borderRadius: "1rem",
                  margin: "2rem 0",
                  padding: "2rem 1rem",
                  display:"flex",
                  justifyContent:"space-around",
                  alignItems:"center"
                }}>
                <Box> 
                  <Typography component="p" variant="h5">
                    {shop.shopName}
                  </Typography>
      
                  {/* <Typography component="p" variant="h5">
                    {shop.email}
                  </Typography>
      
                  <Typography component="p" variant="h5">
                    {shop.phone}
                  </Typography> */}
      
                  {/* {repair.status==="active" && <Button variant="contained" style={ButtonStyle} onClick={() => finishRepair(repair._id)}>
                    Finished
                  </Button>} */}
                </Box>
                <ArrowCircleRightIcon sx={{fontSize:60}} onClick={() => navigate(`/shop/${shop._id}`)}/>
              </Grid>)
          }
        </Container>
    )
}

export default ShopSearch