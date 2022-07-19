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

    return <ThemeContext.Provider value={{ theme, changeTheme }}>{ children }</ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("add ThemeProvider to route");
    return context;
} 

export { ThemeProvider, useTheme }