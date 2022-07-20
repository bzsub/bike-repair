import React, { useEffect, useState } from 'react'
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


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import { todoApi } from "../api/todoApi";

const Book = () => {
  const { token, user, logout } = useAuth();
  const { theme } = useTheme();
  const { get, post, del, update } = todoApi();

  const [shopList, setShopList] = useState([])
  const [choosenShop, setChoosenShop] = useState("")

  const [flatTire, setFlatTire] = useState(false)
  const [chainSwap, setChainSwap] = useState(false)
  const [wheelSwap, setWheelSwap] = useState(false)
  const [comment, setComment] = useState("")
  const [price, setPrice] = useState(0)
  
  const getShops = async () => {
    const response = await get(`/shop`)
    console.log(response.data);
    setShopList(response.data)
  }

  const bookRepair = async () => {
    const response = await post(`/repair`, {
      shop_id: choosenShop._id,
      shopName: choosenShop.shopName,
      user_id: user.userId,
      services: {
        flatTire,
        chainSwap,
        wheelSwap,
      },
      price,
      comment
    })
    setChoosenShop("");
    setPrice(0);
    setFlatTire(false);
    setChainSwap(false);
    setWheelSwap(false);
    setComment("")
    console.log(response.data);
  }

  useEffect(() => {
    getShops()
    // eslint-disable-next-line
  }, [])
  
  return (
    <Container component="main" maxWidth="xs" sx={{
      textAlign:"center",
    }}>
      <Typography component="p" variant="h2">
          Book a repair
      </Typography>
      <FormControl fullWidth sx={{mt:4,mb:4}}>
        <InputLabel id="demo-simple-select-label">Shop name</InputLabel>
        <Select
          sx={{color: theme.colorOne}}
          label="shop name"
          value={choosenShop}
          onChange={ e =>{
             setChoosenShop(e.target.value);
             setPrice(0);
             setFlatTire(false);
             setChainSwap(false);
             setWheelSwap(false);
            }}
        >
          {shopList.length > 0 && shopList.map((shop, i) => <MenuItem value={shop} key={i}>{shop.shopName}</MenuItem> )}
         
        </Select>
      </FormControl>

         
          <FormGroup>
            <FormControlLabel control={<Checkbox
            value={flatTire}
            checked={flatTire === true} 
            onChange={e => { 
              setFlatTire(e.target.checked);
              if (choosenShop) {
                if (e.target.checked) setPrice(price + Number(choosenShop.prices.flatTire))
                else setPrice(price - Number(choosenShop.prices.flatTire))
              }
            }}/>} label="flatTire" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox 
                value={chainSwap}
                checked={chainSwap === true}
                onChange={e =>{
                  setChainSwap(e.target.checked);
                  if (choosenShop) {
                    if (e.target.checked) setPrice(price + Number(choosenShop.prices.chainSwap))
                    else setPrice(price - Number(choosenShop.prices.chainSwap))
                  }
                }}/>} label="chainSwap" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel 
            control={<Checkbox 
              value={wheelSwap}
              checked={wheelSwap === true}
              onChange={e => {
                setWheelSwap(e.target.checked);
                if (choosenShop) {
                  if (e.target.checked) setPrice(price + Number(choosenShop.prices.wheelSwap))
                  else setPrice(price - Number(choosenShop.prices.wheelSwap))
                }
              }}/>} label="wheelSwap" />
          </FormGroup>

          <Typography component="h1" variant="h5" value={price}>
            Price: {price} HUF
            {/* {Number((flatTire && choosenShop) ? choosenShop.prices.flatTire : 0) + Number((chainSwap && choosenShop) ? choosenShop?.prices.chainSwap : 0) + Number((wheelSwap && choosenShop) ? choosenShop?.prices.wheelSwap : 0)} */}
          </Typography>

          <TextField 
            sx={{ mt:2, input: { color: theme.colorOne } }}
            fullWidth
            label="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

      <Button              
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor:theme.colorOne, color:theme.colorTwo}}
        onClick={bookRepair}
      >
        Book Repair
      </Button>
    </Container>
  )
}

export default Book