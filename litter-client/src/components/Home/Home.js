import LitterBox from '../LitterBox/LitterBox.js'
import FollowingFeed from '../FollowingFeed/FollowingFeed.js'
import { Grid, Stack } from '@mui/material'
import LitForm from '../LitForm/LitForm.js'

const Home = () => {

  return ( 
    <Grid container>
      <Grid item xs={9} sx={{ borderRight: '1px solid #dcdcdc' }}>
        <Stack>
          <LitForm />
          <LitterBox />
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <FollowingFeed />
      </Grid>
    </Grid>
  )
}

export default Home