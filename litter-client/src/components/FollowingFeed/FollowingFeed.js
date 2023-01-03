import { Avatar, Card, CardHeader, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getFollowings } from '../../feature/auth/authSlice.js'
import { Link } from 'react-router-dom'

const FollowingFeed = () => {
  const dispatch = useDispatch()

  const { followings } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getFollowings())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, [followings])

  return (
    <>
      <Stack
        id='following'
        spacing={1}
        sx={{ paddingLeft: '50px', paddingTop: '40px', maxWidth: '100%', margin: '0 auto' }}
      >
        {followings?.map((following) => {
          return (
            <Card
              variant='outlined'
              key={Math.random() * 100000}
              sx={{ border: 'none', padding: '0px', margin: '0px' }}
            >
              <CardHeader
                sx={{ border: 'none', padding: '3px', margin: '0px' }}
                avatar={
                  <Avatar sx={{ bgcolor: 'black', width: '30px', height: '30px' }}>
                    {following.username ? following.username[0].toUpperCase() : ''}
                  </Avatar>
                }
                title={
                  <Link style={{ textDecoration: 'none', color: 'black' }} to={'/' + following.id}>
                    {following.username}
                  </Link>
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
