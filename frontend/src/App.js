import React, { useEffect, useState } from 'react'
import notesService from './services/noteService'
import SideBar from './components/SideBar'
import Editor from './components/Editor'
import './App.css'
import { debounce } from './helpers/debounce'
import UserMenu from './components/UserMenu'


const App = () => {
  const [notes, setNotes] = useState([])
  const [visibleNotes, setVisibleNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  let updatedNote = null

  useEffect(() => {
    notesService
    .getNotes()
    .then( notes => { 
      setNotes(notes)
      setVisibleNotes(notes) 
    })
  },[])

  const updateNoteInServer = async (note) => {    
    await notesService.updateNote(note.id, note)
    const newNotesList = notes.map(n => n.id === note.id ? note : n)
    const newVisibleList = visibleNotes.map(n => n.id === note.id ? note : n)
    setNotes(newNotesList)
    setVisibleNotes(newVisibleList)
  }

  const update = debounce(() => {
    updateNoteInServer(updatedNote)
  }, 1000)

  const changeContent = (updatedContent) => {
    updatedNote = {
      ...selectedNote, content: updatedContent
    }
    update()
  }
    
  return (
    <div className='app-container'>
      <SideBar 
        notes={notes} 
        setNotes={setNotes} 
        selectedNoteIndex={selectedNoteIndex}
        setSelectedNoteIndex={setSelectedNoteIndex} 
        setSelectedNote={setSelectedNote} 
        visibleNotes={visibleNotes}
        setVisibleNotes={setVisibleNotes}
        />
      {
        selectedNote ? 
        <Editor selectedNote={selectedNote}
          updateNoteInServer={updateNoteInServer}
          setSelectedNote={setSelectedNote}
          changeContent={changeContent}
          /> :
          null
      }      
      <UserMenu />
    </div>
  )
}

export default App