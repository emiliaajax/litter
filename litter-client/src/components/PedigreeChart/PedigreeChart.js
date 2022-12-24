import { Avatar, Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { follow, getFollowings, getUser, unfollow } from '../../feature/auth/authSlice'
import LitterBox from '../LitterBox/LitterBox'
import { getUserLits } from '../../feature/lits/litsSlice'

function PedigreeChart () {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { lits } = useSelector((state) => state.lits)
  const { user, followings } = useSelector((state) => state.auth)

  const filteredFollowings = followings?.filter((following) => { 
    return following.id === id 
  })

  const { member } = useSelector((state) => state.auth)
  const username = member ? member.username : ''

  useEffect(() => {
    dispatch(getFollowings())
    dispatch(getUser(id))
  }, [])

  useEffect(() => {
    dispatch(getUserLits(id))
  }, [id])

  useEffect(() => {
  }, [followings])

  const onFollow = (event) => {
    event.preventDefault()

    dispatch(follow(id))
  }

  const onUnfollow = (event) => {
    event.preventDefault()

    dispatch(unfollow(id))
  }

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <LitterBox lits={lits}/>
        </Grid>
        <Grid item xs={3}>
          <Stack>
            <Card
              variant='outlined'
              key={Math.random() * 100000} 
              sx={{ border: 'none', padding: '0px', margin: '0px', paddingTop: '10px', paddingLeft: '15px' }}>
              <CardHeader sx={{ border: 'none', margin: '0px', marginLeft: '20px' }}
                avatar={
                  <Avatar sx={{ bgcolor: 'black', width: '200px', height: '200px', borderRadius: '0px' }}>
                    {username? username[0].toUpperCase() : ''}
                  </Avatar>
                }
              />
              <CardContent sx={{ paddingLeft: '50px', textAlign: 'center' }}>
                <Typography>{username}</Typography>
              </CardContent>
            </Card>
            { user.id === id
              ? ''
              : 
              filteredFollowings?.length === 0
              ? <Button onClick={onFollow}>Follow</Button>
              : <Button onClick={onUnfollow}>Unfollow</Button>
            }
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default PedigreeChart