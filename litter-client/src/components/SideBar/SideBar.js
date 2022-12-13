import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import StarIcon from '@mui/icons-material/Star'
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
    <Box sx={{ width: '100%', paddingTop: '20px', maxWidth: '190px', bgcolor: 'background.paper' }}>
      <List component="nav">
        <ListItemButton
          component='a'
          href='/'>          
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Litter Box"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
        <ListItemButton
          component='a'
          href='/explore'>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Explore"
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
            primary="Pedigree Chart"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
        {/* <ListItemButton
          component='a'
          href='/settings'>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Inställningar"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton> */}
        <ListItemButton>
          {/* onClick={onLogout}> */}
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Log out"
            primaryTypographyProps={{ fontSize: '14px' }}
          />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default SideBar