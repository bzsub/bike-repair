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

import { useAuth } from "../providers/auth";
import { useTheme } from "../providers/theme";
import { todoApi } from "../api/todoApi";

const Book = () => {
  const { token, user, logout } = useAuth();
  const { theme } = useTheme();
  const { get, del, update } = todoApi();
  return (
    <Container component="main" maxWidth="xs" sx={{
      textAlign:"center",
  }}>
      <Typography component="p" variant="h2">
          Book a repair
      </Typography>
    </Container>
  )
}

export default Book