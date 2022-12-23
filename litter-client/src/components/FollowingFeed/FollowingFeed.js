import { Avatar, Card, CardHeader, Stack } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getFollowings } from "../../feature/auth/authSlice.js"
// import CircularProgress from '@mui/material/CircularProgress';

const FollowingFeed = () => {
  const dispatch = useDispatch()

  const { followings } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getFollowings())
  }, [])

  useEffect(() => {
    console.log(followings)
  }, [followings])



  return (
    <>
      {/* {isPending
      ? <Stack 
          spacing={1} 
          sx={{ alignItems: 'center', justifyContent: 'center', width: '70vw', height: '20vh' }}>
          <CircularProgress />
        </Stack>
      :  */}
      <Stack
        id='following'
        spacing={1}
        sx={{ paddingLeft: '50px', paddingTop: '40px', maxWidth: '100%', margin: '0 auto' }}>
        {followings?.map((following) => {
          return (
            <Card
              variant='outlined' 
              key={Math.random() * 100000} 
              sx={{ border: 'none', padding: '0px', margin: '0px' }}>
              <CardHeader sx={{ border: 'none', padding: '3px', margin: '0px' }}
                avatar={
                  <Avatar sx={{ bgcolor: 'black', width: '30px', height: '30px' }}>
                    {following.username ? following.username[0].toUpperCase() : ''}
                  </Avatar>
                }
                title={following.username} 
                />
            </Card>
          )
        })}
      </Stack>
      {/* } */}
    </>
  )
}

export default FollowingFeed