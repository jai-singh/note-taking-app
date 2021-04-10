import axios from 'axios'
const url = 'http://localhost:3001/api/signin'

const login = async credentials => {
  const response = await axios.post(url, credentials)
  return response.data
}

const loginService = { login }

export default loginService