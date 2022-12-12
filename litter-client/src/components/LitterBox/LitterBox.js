import { Stack } from "@mui/material"
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getAllActiveUsers } from "../../features/userProfiles/userProfilesSlice"
import LitCard from "../LitCard/LitCard.js"
// import CircularProgress from '@mui/material/CircularProgress';

const Feed = () => {

  const lits = [
    {
      author: 'peterpan',
      date: '16 august | 13.59',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    },
    {
      author: 'peterpan',
      date: '17 august | 18.06',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    },
    {
      author: 'captainhook',
      date: '18 august | 00.12',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
    }
  ]

  //   const user = JSON.parse(localStorage.getItem('user'))

  //   const dispatch = useDispatch()

  //   const { userProfiles, isPending } = useSelector((state) => state.userProfiles)

  //   useEffect(() => {
  //     dispatch(getAllActiveUsers())
  //   }, [dispatch])

  return (
    <>
      {/* {isPending
      ? <Stack 
          spacing={1} 
          sx={{ alignItems: 'center', justifyContent: 'center', width: '70vw', height: '20vh' }}>
          <CircularProgress />
        </Stack>
      :  */}
      <Stack
        id='lits'
        spacing={1}
        sx={{ paddingTop: '5px', maxWidth: '70%', margin: '0 auto' }}>
        {lits?.map((lit) => {
          return (
            <LitCard key={Math.random() * 100000} lit={lit} />
          )
        })}
      </Stack>
      {/* } */}
    </>
  )
}

export default Feed