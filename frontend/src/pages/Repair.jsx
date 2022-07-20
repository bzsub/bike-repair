import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import { todoApi } from "../api/todoApi";


import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingMask from '../components/LoadingMask';



const Repair = () => {
    let params = useParams()
    let navigate = useNavigate()
    
    const { token, user } = useAuth();
    const { theme } = useTheme();
    
    const { get } = todoApi();
    
    const [isLoading, setIsLoading] = useState(false)

    const [repair, setRepair] = useState("")

    const getRepairsById = async () => {
        setIsLoading(true)
        const response = await get(`/repair/${params.id}`)
        console.log(response.data);
        setRepair(response.data)
        setTimeout(() => {
            setIsLoading(false)
        }, 700);
    }

    useEffect(() => {
        getRepairsById()
    },[])

    return (
        <Container component="main" maxWidth="xs" sx={{
            textAlign:"center",
        }}>

            {
                isLoading && <LoadingMask/>
            }
            <ArrowCircleLeftIcon sx={{fontSize:60}} onClick={() => navigate(`/repairlist`)}/>       

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