import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { todoApi } from "../api/todoApi";


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
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
const Input = styled('input')({
  display: 'none',
});


const Home = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { get, post, del, update } = todoApi();

  const [price, setPrice] = useState(0)
  const [shopList, setShopList] = useState([])
  const [choosenShop, setChoosenShop] = useState("")
  const [comment, setComment] = useState("")

  const [repairList, setRepairList] = useState([])

  //ONLY USER
  const getAllShops = async () => {
    const response = await get(`/shop`)
    setShopList(response.data)
  }

  //ONLY USER
  const addRepair = async () => {
    const response = await post(`/repair`, {
      shop_id: choosenShop._id,
      user_id: user.userId,
      comment
    })
    console.log(response.data);
  }

  //ONLY SHOP
  const getRepairsToOneShop = async () => {
    const response = await get(`/repair/shop/${user.userId}`)
    repairList(response.data)
  }


  useEffect(() => {
    getAllShops()
    getRepairsToOneShop()
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <h3>Home</h3>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <p>{token ? "Logged in" : "Anonymus"}</p>

      {(!token || user.entity === "user") ? <Box sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Shop name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choosenShop}
          onChange={ e => setChoosenShop(e.target.value)}
          label="shop name"
        >
          {shopList.length > 0 && shopList.map(repair => <MenuItem value={repair}>{repair.username}</MenuItem> )}
         
        </Select>
      </FormControl>

          <TextField
              margin="normal"
              required
              fullWidth
              name="comment"
              label="Comment"
              type="text"
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="flatTire" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="chainSwap" />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="wheelSwap" />
          </FormGroup>

          <Typography component="h1" variant="h5">
            Price: {price}
          </Typography>
            
          {token ? <Button              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addRepair}
          >
              BOOK REPAIR
          </Button>:
          <Typography component="h1" variant="h5">
            To book a repair please log in
          </Typography>
          }
    </Box> : 
    <Box>
      { 
        repairList.length > 0 && repairList.map(repair => <>
          <Typography component="p" variant="h5">
            {repair.comment}
          </Typography>
          <Typography component="p" variant="h5">
            {repair.user_id}
          </Typography>
        </>)
      }
    </Box>
    
    }
  </Container>
)};

export default Home;
