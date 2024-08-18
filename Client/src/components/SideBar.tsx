import { Grid, Typography } from "@mui/material"
import { useThemeContext } from "../app/hooks/useThemeContext"

export default function SideBar() {
  const { theme } = useThemeContext()
  const color = theme.palette
  return (
    <Grid sx={{ height: "100vh", backgroundColor: `${color.primary}` }}>
      <Grid item sx={{ padding: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
    </Grid>
  )
}
