import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Mode, ThemeContextType } from "../types";

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const savedMode = localStorage.getItem('theme') as Mode ?? 'system'
    const [mode, setMode] = useState<Mode>(savedMode)

    const toggleTheme = (mode: Mode) => {
        setMode(mode);
    }

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', mode)
        } else if (mode === 'light') {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', mode)
        } else {
            const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (prefereEscuro) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', "dark")

            }else{
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', "light")

            }
        }

    }, [mode])



    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>
    )
}

export default ThemeProvider