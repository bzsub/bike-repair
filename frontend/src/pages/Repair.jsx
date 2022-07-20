import React, { useEffect, useState } from 'react'
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



const Repair = () => {
    let params = useParams()
    let navigate = useNavigate()
    
    const { token, user } = useAuth();
    const { theme } = useTheme();
    
    const { get } = todoApi();
    
    

    const [repair, setRepair] = useState("")

    const getRepairsById = async () => {
        const response = await get(`/repair/${params.id}`)
        console.log(response.data);
        setRepair(response.data)
    }

    useEffect(() => {
        getRepairsById()
    },[])

    return (
        <Container component="main" maxWidth="xs" sx={{
            textAlign:"center",
        }}>

            <ArrowCircleLeftIcon sx={{fontSize:60}} onClick={() => navigate(`/`)}/>       

            <Typography component="p" variant="h2">
                Repair
            </Typography>

            {
                repair ? 
                <>
                    <Typography component="p" variant="h2">
                        {repair.comment}
                    </Typography>

                    <Typography component="p" variant="h2">
                        {repair.status}
                    </Typography>
                    
                </> :
                <Typography component="p" variant="h2">
                    we couldn't find the repair you're looking for 
                </Typography>
            }

        </Container>
    )
}

export default Repair