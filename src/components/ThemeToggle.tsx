import { useTheme } from "../hooks/useTheme";
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

const buttonStyle =
  "flex justify-center items-center w-8 py-2 bg-primary text-primary-foreground font-semibold transition-opacity duration-200";





const ThemeToggle = () => {
    const { toggleTheme, mode } = useTheme();

    return (
        <div  className="flex self-end">
            <button onClick={() => toggleTheme("light")} className={`${buttonStyle} rounded-l-lg ${mode == "light" ? "opacity-60" : ""}`}><FiSun />
            </button>
            <button onClick={() => toggleTheme("dark")} className={`${buttonStyle} ${mode == "dark" ? "opacity-60" : ""}`}><FiMoon />
            </button>
            <button onClick={() => toggleTheme("system")} className={`${buttonStyle} rounded-r-lg ${mode == "system" ? "opacity-60" : ""}`}><FiMonitor />
            </button>
        </div>
    )
}

export default ThemeToggle