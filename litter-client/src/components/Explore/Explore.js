import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import LitterBox from "../LitterBox/LitterBox"
import { getHundredLatestLits } from '../../feature/lits/litsSlice.js'

function Explore() {
  const dispatch = useDispatch()
  const { lits } = useSelector((state) => state.lits)

  useEffect(() => {
    dispatch(getHundredLatestLits())
  }, [dispatch])

  return (
    <Grid container>
      <Grid item xs={9}>
      <LitterBox lits={lits}/>
      </Grid>
    </Grid>
  )
}

export default Explore