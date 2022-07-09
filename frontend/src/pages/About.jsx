import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useCounter } from "../hooks/useCounter";
import { useCounter as useGlobalCounter } from "../providers/counter";

const About = () => {
  const { counter, increment, decrement } = useCounter("About");
  const { value, increment: goUp, decrement: goDown } = useGlobalCounter();

  return (
    <div>
      <h3>About</h3>
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

export default About;
