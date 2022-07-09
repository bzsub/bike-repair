import { React, useState, useContext, createContext } from "react";
const CounterContext = createContext();

// custom hook bro
const useCounter = () => {
  return useContext(CounterContext); // read the context and subscribe to its changes
};

const CounterProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    setValue(value - 1);
  };

  return <CounterContext.Provider value={{ increment, decrement, value }}>{children}</CounterContext.Provider>; // provide value for my context
};

export { CounterProvider, useCounter };

/*
my CounterContext must be the same in useContext(here), and in return <here.provider/>
*/
