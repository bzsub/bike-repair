import React, { createContext, useContext } from 'react'
import { useState } from 'react';


const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("light")

    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        console.log(theme);
    }

    return <ThemeContext.Provider value={{ theme, changeTheme }}>{ children }</ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("add ThemeProvider to route");
    return context;
} 

export { ThemeProvider, useTheme }