import axios from 'axios'

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_API

const register = async (userData) => {
  const response = await axios.post(AUTH_SERVICE_URL + 'register', userData)
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userCredentials) => {
  const response = await axios.post(AUTH_SERVICE_URL + 'login', userCredentials)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = async () => {
  const id = JSON.parse(localStorage.getItem('user')).id
  await axios.post(
    AUTH_SERVICE_URL + 'logout', 
    { id }
  )
  localStorage.removeItem('user')
  localStorage.clear()
}

const authService = {
  register,
  login,
  logout
}

export default authService
