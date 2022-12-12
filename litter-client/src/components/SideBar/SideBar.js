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
import { Divider } from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'

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
    <Box sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          component='a'
          href='/'>          
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Hem" />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/my-profile'>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Min profil" />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/messages'>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Meddelanden" />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/settings'>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Inställningar" />
        </ListItemButton>
        <ListItemButton>
          {/* onClick={onLogout}> */}
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
        <Divider />
        <ListItemButton
          component='a'
          href='/privacy'>
          <ListItemIcon>
            <ShieldIcon />
          </ListItemIcon>
          <ListItemText primary="Sekretesspolicy" />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default SideBar