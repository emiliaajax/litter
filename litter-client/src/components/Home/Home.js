import LitterBox from '../LitterBox/LitterBox.js'
import FollowingFeed from '../FollowingFeed/FollowingFeed.js'
import { Grid } from '@mui/material'

const Home = () => {

  return ( 
    <Grid container>
      <Grid item xs={9} sx={{ borderRight: '1px solid #dcdcdc' }}>
        <LitterBox />
      </Grid>
      <Grid item xs={3}>
        <FollowingFeed />
      </Grid>
    </Grid>
  )
}

export default Home