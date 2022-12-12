import { Stack } from '@mui/material'
import SideBar from "../SideBar/SideBar.js"

const BaseLayout = (props) => {
  const { children } = props? props : null

  return (
    <Stack 
      direction='row' 
      spacing={1} 
      sx={{ paddingTop: '20px', paddingBottom: '10px', paddingLeft: '20px' }}>
      <SideBar />
      {children}
    </Stack>
  )
}

export default BaseLayout