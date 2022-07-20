import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
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
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const Input = styled('input')({
  display: 'none',
});



const RepairList = () => {
  
  const navigate = useNavigate();
  const { auth, token, user } = useAuth();
  const { theme } = useTheme();
  
  const { get, post, del, update } = todoApi();

  const [repairList, setRepairList] = useState([])
 

  

  // USER VIEW, to add a repair
  // const addRepair = async () => {
  //   const response = await post(`/repair`, {
  //     shop_id: choosenShop._id,
  //     user_id: user.userId,
  //     comment
  //   })
  //   console.log(response.data);
  // }

  // USER VIEW, to get all repairs for the user
  const getRepairsToOneUser = async () => {
    const response = await get(`/repair/user/${user?.userId}`)
    console.log(response.data);
    setRepairList(response.data)
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
    if (user?.entity === "user") getRepairsToOneUser()
    if (user?.entity === "shop") getRepairsToOneShop()
    
    // eslint-disable-next-line
  },[])

  return (
    <Container component="main" maxWidth="xs" sx={{textAlign:"center"}}>

      <Typography component="p" variant="h2">
        Repairs
      </Typography>
     
      {
        token ?
        !repairList || repairList.length === 0 ? 
          <>
            <Typography component="p" variant="h5" sx={{mt: 2, mb: 2}}>
              You don't have any repairs
            </Typography>
            {user?.entity === "user" && <Button 
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
            </Button>}
          </>
          : repairList.map(repair => <Grid 
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
              {user?.userId}
            </Typography>

            <Typography component="p" variant="h5">
              {repair.comment}
            </Typography>

            <Typography component="p" variant="h5">
              {repair.status}
            </Typography>

            <Typography component="p" variant="h5">
              {repair._id}
            </Typography>

            {repair.status==="active" && <Button 
              variant="contained" 
              sx={{
                backgroundColor:theme.colorOne,
                color:theme.colorTwo}}
              onClick={() => finishRepair(repair._id)}
            >
              Finished
            </Button>}
          </Box>
          <ArrowCircleRightIcon sx={{fontSize:60}} onClick={() => navigate(`/repair/${repair._id}`)}/>
        </Grid>)
        : <>
            <Typography component="p" variant="h5">
              To see your repairs please log in 
            </Typography>
            <Button 
            fullWidth
            onClick={auth} 
            sx={{
                backgroundColor:theme.colorOne,
                color:theme.colorTwo,
                padding: "0.7rem 0",
                mt:2,
            }}
            >
                Google login
            </Button>
          </>
      }
    

      {/* <FormControl fullWidth>
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
      </FormControl> */}

         
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

  </Container>
)};

export default RepairList;