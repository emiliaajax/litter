import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import LitterBox from "../LitterBox/LitterBox"

function PedigreeChart () {
  const profile = {
    username: 'peterpan'
  }

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <LitterBox />
        </Grid>
        <Grid item xs={3}>
          <Card
            variant='outlined'
            key={Math.random() * 100000} 
            sx={{ border: 'none', padding: '0px', margin: '0px', paddingTop: '10px', paddingLeft: '15px' }}>
            <CardHeader sx={{ border: 'none', margin: '0px', marginLeft: '20px' }}
              avatar={
                <Avatar sx={{ bgcolor: 'black', width: '200px', height: '200px', borderRadius: '0px' }}>
                  {profile.username[0].toUpperCase()}
                </Avatar>
              }
            />
            <CardContent sx={{ paddingLeft: '50px', textAlign: 'center' }}>
              <Typography>{profile.username}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PedigreeChart