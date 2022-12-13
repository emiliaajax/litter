import axios from 'axios'

const LITS_SERVICE_URL = process.env.REACT_APP_USER_PROFILES_API

const litsAxios = axios.create({
  baseURL: LITS_SERVICE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).accessToken : ''}`
  }
})

const getHundredLatestLits = async () => {
  const response = await litsAxios(
    'users',
    { method: 'GET' }
  )

  return response.data
}

const getLitsById = async (id) => {
  const response = await litsAxios(
    `${id}`,
    { method: 'GET' }
  )

  return await response.data
}

const postLit = async (litData) => {
  const response = await axios.post(LITS_SERVICE_URL + 'create', litData)

  return response.data
}

/**
 * Object with functions to be exported.
 */
const litsService = {
  getHundredLatestLits,
  getLitsById,
  postLit
}

export default litsService