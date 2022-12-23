import { Avatar, Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser } from '../../feature/auth/authSlice'
import LitterBox from '../LitterBox/LitterBox'
import { getLitsById } from '../../feature/lits/litsSlice'

function PedigreeChart () {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { lits } = useSelector((state) => state.lits)
  const { user } = useSelector((state) => state.auth)

  const { member } = useSelector((state) => state.auth)
  const username = member ? member.username : ''

  useEffect(() => {
    dispatch(getLitsById(id))
  }, [id])

  useEffect(() => {
    dispatch(getUser(id))
  }, [id])

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
              : <Button>Follow/unfollow</Button>
            }
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default PedigreeChart