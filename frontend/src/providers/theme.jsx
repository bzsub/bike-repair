import React, { createContext, useContext } from 'react'
import { useState } from 'react';


const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState({
        name:"light",
        colorOne:"#443E6D",
        colorTwo:"#DFDAD9",
        colorThree:"#FB8543",
        colorFour:"#FFCBB8",
    })

    const changeTheme = () => {
        setTheme(theme.name === "dark" ? 
        {
            name:"light",
            colorOne:"#443E6D",
            colorTwo:"#DFDAD9",
            colorThree:"#FB8543",
            colorFour:"#FFCBB8",
        } : 
        {
            name:"dark",
            colorOne:"#DFDAD9",
            colorTwo:"#443E6D",
            colorThree:"#FB8543",
            colorFour:"#FFCBB8",
        }
        );
        //console.log(theme.name)   
    }

    const ButtonStyle = {
        backgroundColor:theme.colorOne,
        color:theme.colorTwo,
        fontWeight:"700",
        margin: "1rem 0.5rem"
    }

    const TextFieldStyle = {
        color:theme.colorOne,
        
        '& label.Mui-focused': {
          color: theme.colorOne,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.colorOne,
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.colorOne,
          },
        },
    }



    return <ThemeContext.Provider value={{ theme, changeTheme, ButtonStyle, TextFieldStyle }}>{ children }</ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("add ThemeProvider to route");
    return context;
} 

export { ThemeProvider, useTheme }