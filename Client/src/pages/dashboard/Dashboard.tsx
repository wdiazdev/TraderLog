import { Grid } from "@mui/material"
import SideBar from "../../components/SideBar"
import TopBar from "../../components/TopBar"
import MainContent from "./MainContent"

export default function Dashboard() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBar />
      </Grid>

      <Grid item xs={10}>
        <Grid container direction="column">
          <Grid item>
            <TopBar />
          </Grid>
          <Grid item>
            <MainContent />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
