import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import profileImage from './profile-image.png'
import Avatar from '@mui/material/Avatar'
// import { useDispatch } from "react-redux";
// import { getUser } from "../../features/userProfiles/userProfilesSlice";

const LitCard = (props) => {
  const lit = props.lit
  // const dispatch = useDispatch()

  return (
    <Card 
      variant='outlined' 
      sx={{ width: '100%', borderRadius: '0px', border: 'none', borderColor: 'rgb(242, 242, 242)', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '0px' }} >
      <Stack>
        <CardHeader
          sx={{ paddingBottom: '0px' }}
          avatar={
            <Avatar sx={{ bgcolor: 'white' }}>
              <img src={profileImage} width='35px'></img>
            </Avatar>
          }
          title={lit.author}
          subheader={lit.date}
        />
        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent 
            sx={{ flex: '1 0 auto', paddingTop: '5px', paddingBottom: '20px !important' }}>
            <Typography
              noWrap
              variant="body2"
              color="text.secondary"
              style={{ display: 'inline-block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
              {lit.text}
            </Typography>
          </CardContent>
        </Box>
      </Stack>
    </Card>
  )
}

export default LitCard
