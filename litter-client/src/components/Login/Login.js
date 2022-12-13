import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../feature/auth/authSlice.js'
import { Button, FormLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
  
    const { email, password } = formData
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
  
    useEffect(() => {
      if(isError) {
        toast.error(message)
      }
  
      if(user) {
        navigate('/')
      }
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]) 
  
    const onChange = (event) => {
      setFormData((previousState) => ({
        ...previousState,
        [event.target.name]: event.target.value
      }))
    }
    
    const onSubmit = (event) => {
      event.preventDefault()
  
      const userCredentials = { 
        email,
        password
      }
  
      dispatch(login(userCredentials))
    }
  
    return ( 
      <div className='login'>
  
        <Stack
          height='100%'
          width='100%'
          direction='row'
          spacing={2}
          justifyContent='space-evenly'
          alignItems='center'>
          
          <Stack
            className='companyName'
            margin-left='0'
            height='100%'
            width='50%'
            spacing={2}
            justifyContent='center'
            textAlign='center'>
              <Typography 
                variant='h2' 
                component='h1'
                color='black'
                fontWeight='500'>
                  litter
              </Typography>
              {/* <Typography 
                variant='h5' 
                component='h2'
                color='white'>
                  Upplev världen tillsammans
              </Typography> */}
          </Stack>
  
          <form className="loginForm" onSubmit={onSubmit}>
            <Stack
              spacing={3}
              width='30vw'
              justifyContent='center'
              alignItems='center'>
              <FormLabel
                variant='h6'
                component='h3'>
                Log in to your account
              </FormLabel>
              <TextField
                id='email'
                name='email'
                type='email' 
                variant='outlined'
                label='E-mail'
                fullWidth
                value={email}
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}>
              </TextField>
              <TextField
                id='password'
                name='password'
                type='password' 
                variant='outlined'
                label='Password'
                fullWidth
                value={password}
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  )
                }}>
              </TextField>
              <FormLabel>
                No account? <Link className='registerLink' to='/register'>Register!</Link>
              </FormLabel>
              <Button 
                type='submit'
                variant="contained"
                component="button">
                  Log in
              </Button>
            </Stack>
          </form>
        </Stack>
  
      </div>
    )
  }
  
  export default Login