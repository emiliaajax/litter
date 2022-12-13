import { Grid } from "@mui/material"
import LitterBox from "../LitterBox/LitterBox"

function Explore() {
  return (
    <Grid container>
      <Grid item xs={9}>
      <LitterBox />
      </Grid>
    </Grid>
  )
}

export default Explore