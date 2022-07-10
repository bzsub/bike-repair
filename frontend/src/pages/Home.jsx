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

  // USER VIEW, to fill the select element
  const getAllShops = async () => {
    const response = await get(`/shop`)
    setShopList(response.data)
  }

  // USER VIEW, to add a repair
  const addRepair = async () => {
    const response = await post(`/repair`, {
      shop_id: choosenShop._id,
      user_id: user.userId,
      comment
    })
    console.log(response.data);
  }

  // SHOP VIEW, to get all repairs for the shop
  const getRepairsToOneShop = async () => {
    const response = await get(`/repair/shop/${user?.userId}`)
    console.log(response.data);
    setRepairList(response.data)
  }

  const finishRepair = async (repairId) => {
    const response = await update(`/repair/${repairId}`,{
      status: "finished"
    })
    getRepairsToOneShop()
    console.log(response.data)
  }

  useEffect(() => {
    if (user?.entity === "user") {
      getAllShops()
    } else {
      getRepairsToOneShop()
    }
    // eslint-disable-next-line
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="p" variant="h2">
        Home
      </Typography>
      {/* 
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <p>{token ? "Logged in" : "Anonymus"}</p> */}
     
      { 
        (user?.entity === "shop" && repairList.length > 0 ) ? repairList.map(repair => <Box>
            <Typography component="p" variant="h5">
              {repair.comment}
            </Typography>
            <Typography component="p" variant="h5">
              {repair.status}
            </Typography>
            <Typography component="p" variant="h5" onClick={() => navigate(`/repair/${repair._id}`)}>
              {repair._id}
            </Typography>
            <Button onClick={() => finishRepair(repair._id)}>Finished</Button>
          </Box>) 
          :
          <Typography component="p" variant="h5">
            You don't have more repairs
          </Typography>
      }
    
      {(!token || user?.entity === "user") && <Box sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Shop name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choosenShop}
          onChange={ e => setChoosenShop(e.target.value)}
          label="shop name"
        >
          {shopList.length > 0 && shopList.map((repair, i) => <MenuItem value={repair} key={i}>{repair.username}</MenuItem> )}
         
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
          {/* <FormGroup>
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
          </Typography> */}
            
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
    </Box> 
    
    
    }
  </Container>
)};

export default Home;
