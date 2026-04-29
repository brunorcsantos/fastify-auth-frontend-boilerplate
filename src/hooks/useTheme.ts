import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider")
    }
    return context
}

export { useTheme }