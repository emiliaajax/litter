import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import profileImage from './profile-image.png'
import Avatar from '@mui/material/Avatar'
import dateFormat from 'dateformat'

const LitCard = (props) => {
  const lit = props.lit
  const date = dateFormat(new Date(lit.createdAt), 'mmmm d, yyyy')
  const authorPageUrl = lit ? `/${lit.authorId}` : ''

  return (
    <Card
      variant='outlined'
      sx={{ width: '100%', borderRadius: '0px', border: 'none', borderColor: 'rgb(242, 242, 242)', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '0px' }}
    >
      <Stack>
        <CardHeader
          sx={{ paddingBottom: '0px' }}
          avatar={
            <Avatar sx={{ bgcolor: 'white' }}>
              <img src={profileImage} alt='Profile of user' width='35px' />
            </Avatar>
          }
          title={
            <a style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} href={authorPageUrl}>
              {lit.author}
            </a>
          }
          subheader={date}
        />
        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <CardContent
            sx={{ flex: '1 0 auto', paddingTop: '5px', paddingBottom: '20px !important' }}
          >
            <Typography
              noWrap
              variant='body2'
              color='text.secondary'
              style={{ display: 'inline-block', whiteSpace: 'pre-line', wordBreak: 'break-word' }}
            >
              {lit.text}
            </Typography>
          </CardContent>
        </Box>
      </Stack>
    </Card>
  )
}

export default LitCard
