import axios from 'axios'

const url = 'http://localhost:3001/api/notes'
let token = null 
let config = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getNotes = () => { 
  return axios
    .get(url, config)
    .then(response => response.data)
} 

const addNote = (note) => {
  return axios
    .post(url, note, config)
    .then(response => response.data)
}

const deleteNote = (id) => {
  return axios
    .delete(`${url}/${id}`, config)
    .then(response => response.data)
}

const updateNote = (id, updatedNote) => {
  return axios
    .put(`${url}/${id}`, updatedNote, config)
}

const updatePassword = upadtedCredentials => {
  const updatePasswordUrl = 'http://localhost:3001/api/signin'
  return axios
    .put(updatePasswordUrl, upadtedCredentials, config)
    .then(response => response.data)
}


const noteService = { setToken, getNotes, addNote, deleteNote, updateNote, updatePassword }

export default noteService