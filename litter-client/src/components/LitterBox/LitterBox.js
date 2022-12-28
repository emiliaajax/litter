import { CircularProgress, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LitCard from '../LitCard/LitCard.js'

const LitterBox = (props) => {
  const { lits } = props
  const { isPending } = useSelector((state) => state.lits)

  useEffect(() => {}, [isPending])

  return (
    <>
      {isPending
        ? <Stack
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
          <CircularProgress sx={{ color: 'orange' }} />
        </Stack> // eslint-disable-line react/jsx-closing-tag-location
        : <Stack
            id='lits'
            spacing={1}
            sx={{ paddingTop: '5px', maxWidth: '70%', margin: '0 auto' }}
          >
          {lits?.map((lit) => {
            return (
              <LitCard key={Math.random() * 100000} lit={lit} />
            )
          })}
        </Stack> /* eslint-disable-line react/jsx-closing-tag-location */}
    </>
  )
}

export default LitterBox
