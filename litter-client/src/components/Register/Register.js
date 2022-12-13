import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../feature/auth/authSlice'
import { Button, FormLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'

const EMAIL_REGX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const PASSWORD_REGX = /^.{10,1000}$/

const Register = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordVerification: ''
  })

  const { email, password, passwordVerification } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess && user) {
      navigate('/first')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  useEffect(() => {
    setValidEmail(EMAIL_REGX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PASSWORD_REGX.test(password))
  }, [password])

  useEffect(() => {
    setPasswordMatch(password === passwordVerification)
  }, [password, passwordVerification, passwordMatch])

  useEffect(() => {
    if (validEmail && validPassword && passwordMatch) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [validEmail, validPassword, passwordMatch])

  const onChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }
  
  const onSubmit = (event) => {
    event.preventDefault()

    if (password !== passwordVerification) {
      toast.error('Lösenorden matchar inte')
    } else {
      const userData = { 
        email,
        password
      }

      dispatch(register(userData))

    }
  }

  return ( 
    <div className='register'>
      <Stack
        height='100%'
        width='100%'
        direction='row'
        spacing={2}
        justifyContent='center'
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
            color='black'>
              The only one you need
          </Typography> */}
        </Stack>


        <form className="registerForm" onSubmit={onSubmit}>
          <Stack
            spacing={3}
            width='30vw'
            justifyContent='center'
            alignItems='center'>
            <FormLabel
              variant='h6'
              component='h3'>
              Create account
            </FormLabel>
            <TextField
              id='email'
              name='email'
              type='email' 
              variant='outlined'
              label='E-mail'
              fullWidth
              required
              error={validEmail || email === '' ? false : true}
              helperText={validEmail || email === '' ? '' : 'Please provide a valid email'}
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
              required
              error={validPassword || password === '' ? false : true}
              helperText={validPassword || password === '' ? '' : 'The password must be of at least 10 characters'}
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
            <TextField
              id='passwordVerification'
              name='passwordVerification'
              type='password' 
              variant='outlined'
              label='Confirm password'
              fullWidth
              required
              error={passwordMatch || passwordVerification === '' ? false : true}
              helperText={passwordMatch || passwordVerification === '' ? '' : 'The passwords does not match'}
              value={passwordVerification}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                )
              }}>
            </TextField>
            <Button 
              type='submit'
              variant="contained"
              component="button"
              disabled={buttonDisabled ? true : false}>
                Register
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  )
}

export default Register
