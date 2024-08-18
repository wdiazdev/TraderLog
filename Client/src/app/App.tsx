import { ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useThemeContext } from "./hooks/useThemeContext"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const { theme } = useThemeContext()
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <Outlet />
      </ThemeProvider>
    </>
  )
}

export default App
