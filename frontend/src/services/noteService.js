import axios from 'axios'

const url = 'http://localhost:3001/notes'

const getNotes = async () => {
  return await axios
    .get(url)
    .then(response => response.data)
} 

const addNote = async (note) => {
  return await axios
    .post(url, note)
    .then(response => response.data)
}

const deleteNote = async (id) => {
  return await axios
    .delete(`${url}/${id}`)
    .then(response => response.data)
}

const updateNote = async (id, updatedNote) => {
  return await axios
    .put(`${url}/${id}`, updatedNote)
}

const noteService = { getNotes, addNote, deleteNote, updateNote }

export default noteService