import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import EmailIcon from '@mui/icons-material/Email'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { logout, reset } from '../../features/auth/authSlice'

const SideBar = () => {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  
  // const onLogout = (event) => {
  //   event.preventDefault()
  //   dispatch(logout())
  //   dispatch(reset())
  //   navigate('/')
  // }

  return (
    <Box sx={{ width: '100%', paddingTop: '20px', maxWidth: '160px', bgcolor: 'background.paper' }}>
      <List component="nav">
        <ListItemButton
          component='a'
          href='/'>          
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Hem"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/my-profile'>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Min profil"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/messages'>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Meddelanden"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/settings'>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Inställningar"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
        <ListItemButton>
          {/* onClick={onLogout}> */}
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default SideBar