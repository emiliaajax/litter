import { Avatar, Card, CardHeader, Divider, Stack, Typography } from "@mui/material"
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getAllActiveUsers } from "../../features/userProfiles/userProfilesSlice"
// import CircularProgress from '@mui/material/CircularProgress';

const FollowingFeed = () => {

  const followings = [
    {
      username: 'peterpan'
    },
    {
      username: 'tingeling'
    },
    {
      username: 'captainhook'
    }
  ]

  //   const user = JSON.parse(localStorage.getItem('user'))

  //   const dispatch = useDispatch()

  //   const { userProfiles, isPending } = useSelector((state) => state.userProfiles)

  //   useEffect(() => {
  //     dispatch(getAllActiveUsers())
  //   }, [dispatch])

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
                    {following.username[0].toUpperCase()}
                  </Avatar>
                }
                //     action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
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