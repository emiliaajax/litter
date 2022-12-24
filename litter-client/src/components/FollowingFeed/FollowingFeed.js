import { Avatar, Card, CardHeader, Stack } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getFollowings } from "../../feature/auth/authSlice.js"

const FollowingFeed = () => {
  const dispatch = useDispatch()

  const { followings } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getFollowings())
  }, [])

  useEffect(() => {}, [followings])

  return (
    <>
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
                title={
                  <a style={{ textDecoration: 'none', color: 'black' }}href={'/' + following.id}>
                    {following.username}
                  </a>
                } 
                />
            </Card>
          )
        })}
      </Stack>
    </>
  )
}

export default FollowingFeed