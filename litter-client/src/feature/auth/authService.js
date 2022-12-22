import axios from 'axios'

const AUTH_URL = process.env.REACT_APP_AUTH_API
const USERS_URL = process.env.REACT_APP_USERS_API

const usersAxios = axios.create({
  baseURL: USERS_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).accessToken : ''}`
  }
})

const register = async (userData) => {
  const response = await axios.post(AUTH_URL + 'register', userData)

  return response.data
}

const login = async (userCredentials) => {
  const response = await axios.post(AUTH_URL + 'login', userCredentials)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = async () => {
  const id = JSON.parse(localStorage.getItem('user')).id
  await axios.post(
    AUTH_URL + 'logout', 
    { id }
  )
  localStorage.removeItem('user')
  localStorage.clear()
}

const getFollowings = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const response = await usersAxios(
    `${user.id}/followings`,
    { method: 'GET' }
  )

  return response.data
}

const follow = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const response = await usersAxios(
    `${user.id}/followings`,
    { 
      method: 'POST', 
      data: { id }
    }
  )
}

const unfollow = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const response = await usersAxios(
    `${user.id}/followings`,
    { 
      method: 'DELETE', 
      data: { id }
    }
  )
}

const authService = {
  register,
  login,
  logout,
  getFollowings,
  follow,
  unfollow
}

export default authService
