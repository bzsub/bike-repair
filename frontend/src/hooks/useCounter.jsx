import { React, useEffect, useState } from "react";

export const useCounter = (componentName) => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  useEffect(() => {
    localStorage.setItem("counter" + componentName, counter);
    // eslint-disable-next-line
  }, [counter]);

  useEffect(() => {
    const localCounter = parseInt(localStorage.getItem("counter" + componentName));
    setCounter(localCounter || 0);
    // eslint-disable-next-line
  }, []);

  return { counter, increment, decrement };
};
