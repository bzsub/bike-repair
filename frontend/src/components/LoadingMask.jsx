import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTheme } from "../providers/theme";


const LoadingMask = () => {
    const { theme } = useTheme();

    return (
        <Box sx={{ 
            display: 'flex', 
            alignItems: "center",
            justifyContent: "center",
            position:"absolute",
            top:"60px", 
            left:"0", 
            bottom:"0", 
            right:"0", 
            color:theme.colorOne,
            backgroundColor:theme.colorTwo,
            zIndex: "100"
        }}>
        <CircularProgress sx={{
            width:"5rem !important",
            height:"5rem !important",
            color:theme.colorOne,
            backgroundColor:theme.colorTwo,

        }} />
        </Box>
    )
}

export default LoadingMask