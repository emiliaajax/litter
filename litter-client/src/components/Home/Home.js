import LitterBox from '../LitterBox/LitterBox.js'
import FollowingFeed from '../FollowingFeed/FollowingFeed.js'
import { CircularProgress, Grid, Stack } from '@mui/material'
import LitForm from '../LitForm/LitForm.js'
import { getAllLitsForLitterBox, reset } from '../../feature/lits/litsSlice.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()

  const { lits, isPosted } = useSelector((state) => state.lits) 

  useEffect(() => {
    dispatch(getAllLitsForLitterBox())
    dispatch(reset())
  }, [dispatch, isPosted])

  return ( 
    <Grid container>
      <Grid item xs={9} sx={{ borderRight: '1px solid #dcdcdc' }}>
        <Stack>
          <LitForm />
          <LitterBox lits={lits}/>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <FollowingFeed />
      </Grid>
    </Grid>
  )
}

export default Home