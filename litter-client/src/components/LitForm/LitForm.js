import { Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postLit, getAllLitsForLitterBox } from '../../feature/lits/litsSlice.js'

function LitForm () {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    text: ''
  })
  const { text } = formData

  useEffect(() => {
    if (isSuccess && posted) {
      dispatch(getAllLitsForLitterBox())
    }

    if(isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch, updated]) 

  const onChange = (event) => {
    const numberOfWords = event.target.value.trim().split(' ').length

    if (numberOfWords < 42) {
      setFormData((previousState) => ({
        ...previousState,
        [event.target.name]: event.target.value
      }))
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(postLit(formData))
  }

  return (
    <form 
      onSubmit={onSubmit} 
      style={{ paddingTop: '30px', paddingBottom: '30px', width: '70%', margin: '0 auto', paddingLeft: '30px' }}>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField
            id='litText'
            name='text'
            placeholder="What's happening?"
            type='text'
            multiline
            size='small'
            value={text}
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            type='submit'
            size='small'
            sx={{ height: '30px', color: 'black', backgroundColor: 'orange', borderRadius: '30px', marginTop: '5px'}}>
            Lit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default LitForm