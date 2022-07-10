import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";
import { useAuth } from "../providers/auth";

//Home is now our login page
const Home = () => {
  const navigate = useNavigate();
  const { token, auth, user } = useAuth();

  const { counter, increment, decrement } = useCounter("Home");
  const { value, increment: goUp, decrement: goDown } = useGlobalCounter();

  return (
    <div>
      <h3>Home</h3>
      <p>{user?.userId}</p>
      <p>{user?.entity}</p>
      <p>{token ? "Logged in" : "Anonymus"}</p>
      <p>
        {token ? (
          "Welcome"
        ) : (
          <Button onClick={auth} variant="contained" size="small">
            Google login
          </Button>
        )}
      </p>
      <h4>Counter: {counter}</h4>
      <Button onClick={decrement} variant="contained" size="small">
        -
      </Button>
      <Button onClick={increment} variant="contained" size="small">
        +
      </Button>
      <h4>Provider Value: {value}</h4>
      <Button onClick={goDown} variant="contained" size="small">
        -
      </Button>
      <Button onClick={goUp} variant="contained" size="small">
        +
      </Button>
    </div>
  );
};

export default Home;
