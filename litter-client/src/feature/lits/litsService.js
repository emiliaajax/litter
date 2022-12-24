import axios from 'axios'
import authService from '../auth/authService.js'

const LITS_SERVICE_URL = process.env.REACT_APP_LITS_API

const litsAxios = axios.create({
  baseURL: LITS_SERVICE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : ''}`
  }
})

const getHundredLatestLits = async () => {
  const response = await litsAxios(
    { method: 'GET' }
  )

  for (const lit of response.data) {
    const author = await authService.getUser(lit.authorId)

    lit.author = author.user.username
  }

  console.log(response.data)

  return response.data
}

const getUserLits = async (id) => {
  const lits = await getLitsById(id)
  const user = await authService.getUser(id)

  lits.map((lit) => lit.author = user.user.username)

  return lits
}

const getLitsById = async (id) => {
  const response = await litsAxios(
    `${id}`,
    { method: 'GET' }
  )

  return response.data
}

const getAllLitsForLitterBox = async () => {
  const lits = []
  const followings = await authService.getFollowings()

  for (const following of followings) {
    const author = await authService.getUser(following.id)
    const litsFromFollowedUser = await getLitsById(following.id)

    litsFromFollowedUser.map((lit) => lit.author = author.user.username)
    
    lits.push(litsFromFollowedUser)
  }

  const myLits = await getLitsById(JSON.parse(localStorage.getItem('user')).id)
  const myUser = await authService.getUser(JSON.parse(localStorage.getItem('user')).id)

  myLits.map((lit) => lit.author = myUser.user.username)

  lits.push(myLits)

  return lits.flat().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

const postLit = async (litData) => {
  const response = await litsAxios({
    method: 'POST',
    data: litData
  })

  return response.data
}

/**
 * Object with functions to be exported.
 */
const litsService = {
  getHundredLatestLits,
  getLitsById,
  getUserLits,
  getAllLitsForLitterBox,
  postLit
}

export default litsService