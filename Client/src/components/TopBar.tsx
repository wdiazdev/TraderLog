import { AppBar, Toolbar, IconButton, Typography, Box, PaletteMode } from "@mui/material"
import PersonIcon from "@mui/icons-material/Menu"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useThemeContext } from "../app/hooks/useThemeContext"

export default function TopBar() {
  const { toggleThemeMode, mode } = useThemeContext()
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5">Dashboard</Typography>
        </Box>
        <Box>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <PersonIcon />
          </IconButton>
          <IconButton
            onClick={toggleThemeMode}
            size="large"
            edge="start"
            color="inherit"
            aria-label="mode-toggle"
            sx={{ mr: 2 }}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
