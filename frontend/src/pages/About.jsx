import { React, useEffect, useState } from "react";
import { useAuth } from "../providers/auth";
import { todoApi } from "../api/todoApi";
import Typography from '@mui/material/Typography';

const About = () => {
  const { user, token } = useAuth();
  const { get } = todoApi();

  return (
    <div>
      <Typography component="p" variant="h2">
        About
      </Typography>
      {/* <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <p>{token ? "Logged in" : "Anonymus"}</p> */}
    </div>
  );
};

export default About;
