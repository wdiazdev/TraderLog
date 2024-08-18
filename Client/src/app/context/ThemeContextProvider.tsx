import { createTheme, PaletteMode, Theme } from "@mui/material"
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react"
import { themeSettings } from "../theme"

interface ThemeContextType {
  mode: PaletteMode
  toggleThemeMode: () => void
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleThemeMode: () => {},
  theme: createTheme(),
})

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const storedMode = (localStorage.getItem("themeMode") as PaletteMode) || "dark"
  const [mode, setMode] = useState<PaletteMode>(storedMode)

  useEffect(() => {
    localStorage.setItem("themeMode", mode)
  }, [mode])

  const toggleThemeMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"))

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const COLORS = theme.palette

  const value = { mode, toggleThemeMode, theme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
