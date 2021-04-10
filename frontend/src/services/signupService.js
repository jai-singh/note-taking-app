import axios from 'axios'
const url = 'http://localhost:3001/api/signup'

const signup =  credentials => {
  return axios
    .post(url, credentials)
    .then(response => response.data)
}

const signupService = { signup }

export default signupService