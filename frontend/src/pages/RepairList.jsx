import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import { todoApi } from "../api/todoApi";

import LoadingMask from "../components/LoadingMask";
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const RepairList = () => {
  
  const navigate = useNavigate();
  const { auth, token, user } = useAuth();
  const { theme } = useTheme();
  
  const { get, post, del, update } = todoApi();

  const [isFiltering, setIsFiltering] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [repairList, setRepairList] = useState([])
 

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
    setIsLoading(true)
    if (user?.entity === "user") getRepairsToOneUser()
    if (user?.entity === "shop") getRepairsToOneShop()
    setTimeout(() => {
      setIsLoading(false)
    }, 700);
    // eslint-disable-next-line
  },[])

  return (
    <Container component="main" maxWidth="xs" sx={{mt:10, textAlign:"center"}}>

      <Typography component="p" variant="h2">
        Repairs
      </Typography>
      {
        isLoading && <LoadingMask/> 
      }
      
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
          : 
          <>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox 
                value={isFiltering}
                checked={isFiltering === true}
                onChange={e => setIsFiltering(!isFiltering)}/>} label="show only active" />
          </FormGroup>
            {repairList.filter(repair => isFiltering ? repair.status === "active" : repair).map(repair => <Grid 
            container 
            spacing={2} 
            sx={{
              border: "2px solid " + theme.colorOne,
              borderRadius: "1rem",
              margin: "2rem 0",
              padding: "2rem 1rem",
              display:"flex",
              justifyContent:"space-around",
              alignItems:"center",
              width:"100%"
            }}>
            <Box sx={{width:"80%"}}> 
              <Typography component="p" variant="h5">
                shop name: {repair.shopName}
              </Typography>

              <Typography component="p" variant="h5">
                user comment: {repair.comment}
              </Typography>

              <Typography component="p" variant="h5">
                status: {repair.status}
              </Typography>

              <Typography component="p" variant="h5">
                work to be done: {Object.keys(repair.services).filter(k => repair.services[k]).join(", ") }
              </Typography>

              <Typography component="p" variant="h5">
                price: {repair.price} HUF
              </Typography>

              {user?.entity === "shop" && repair.status==="active" && <Button 
                variant="contained"
                fullWidth 
                sx={{
                  backgroundColor:theme.colorOne,
                  color:theme.colorTwo}}
                onClick={() => finishRepair(repair._id)}
              >
                Finished
              </Button>}
            </Box>
            <ArrowCircleRightIcon sx={{fontSize:60}} onClick={() => navigate(`/repair/${repair._id}`)}/>
          </Grid>)}
        </>
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
  </Container>
)};

export default RepairList;
