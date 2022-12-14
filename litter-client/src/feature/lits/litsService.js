import axios from 'axios'

const LITS_SERVICE_URL = process.env.REACT_APP_LITS_API

// const user = JSON.parse(localStorage.getItem('user'))

const user = { followings: ['123', '456', '111']}

const litsAxios = axios.create({
  baseURL: LITS_SERVICE_URL,
  // headers: {
  //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).accessToken : ''}`
  // }
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

const getAllLitsForLitterBox = async () => {
  const lits = []
  for (const id of user.followings) {
    lits.push(await getLitsById(id))
  }

  return lits.flat()
}

const postLit = async (litData) => {
  const response = await axios.post(LITS_SERVICE_URL, litData)

  return response.data
}

/**
 * Object with functions to be exported.
 */
const litsService = {
  getHundredLatestLits,
  getLitsById,
  getAllLitsForLitterBox,
  postLit
}

export default litsService