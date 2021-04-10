import React, { useState } from 'react'
import Notes from './Notes'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import noteService from '../services/noteService'
import DeleteDialog from './DeleteDialog'

const useStyles = makeStyles({
  sidebarContainer: {
    marginTop: '0px',
    width: '300px',
    height: '100%',
    boxSizing: 'border-box',
    float: 'left',
    overflow: 'auto',
    boxShadow: '0px 0px 2px black',
    padding: '0px',
    fontFamily: 'Roboto, sans-serif'
  },
  newNoteBtn: {    
    width: '100%',
    height: '40px',
    borderBottom: '1px solid black',
    borderRadius: '0px',    
    color: '#fff', 
    fontSize: '20px',
    background: 'linear-gradient(#36D1DC,#5B86E5)',
    '&:hover': {
      background: 'linear-gradient(#1c92d2,#5B86E5)'
    }   
  },
  newNoteInput: {
    width: '100%',
    margin: '0px',
    height: '35px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    fontSize: '18px',
    boxShadow: '0px 0px 2px black',
    '&:focus': {
      outline: '2px solid rgba(81, 203, 238, 1)'
    }
  },
  newNoteSubmitBtn: {
    width: '100%',
    background: 'linear-gradient(#11998e,#38ef7d)',
    borderRadius: '0px',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(#00F260,#0575E6)'
    }
  },
  searchBox: {
    width: '97.5%',
    margin: '0px',
    height: '35px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    fontSize: '18px',
    boxShadow: '0px 0px 2px black',
    '&:focus': {
      outline: '2px solid rgba(41, 241, 195, 1)'
    }
  }
});

const SideBar = ({ notes, setNotes, selectedNoteIndex, setSelectedNoteIndex, setSelectedNote, visibleNotes, setVisibleNotes }) => {
  const [newNoteStatus, setNewNoteStatus ] = useState(false)
  const [title, setTitle] = useState('')
  const [term, setTerm] = useState('')
  const [tempNote, setTempNote] = useState('')
  const [warningStatus, setWarningStatus] = useState(false)

  const newNoteButtonClicked = () => setNewNoteStatus(newNoteStatus ? false : true)

  const updateTitle = (event) => {
    const newTitle = event.target.value
    setTitle(newTitle)
  }
  
  const newNote = async (event) => {
    event.preventDefault()
    const note = {
      title: title,
      content: '',
      date: new Date()
    }
    const newNote = await noteService.addNote(note)
    setNotes(notes.concat(newNote))
    if(note.title.search(term) !== -1) setVisibleNotes(visibleNotes.concat(newNote))
    setTitle('')
    setNewNoteStatus(false)
  }

  const deleteNote = (note) => {
    setTempNote(note)
    setWarningStatus(true)
  }

  const remove = async (note) => {
    await noteService.deleteNote(note.id)
    if(note.id === selectedNoteIndex) setSelectedNote(null) 
    const newNotesList = notes.filter(n => n.id !== note.id)
    const newVisibleList = visibleNotes.filter(n => n.id !== note.id)
    setNotes(newNotesList)
    setVisibleNotes(newVisibleList)
  }

  const performSearch = () => {
    const searchResult = (term!=='') ? notes.reduce((notesFound, note) => {
      if (note.title.toLowerCase().search(term.toLowerCase()) !==-1){
        return notesFound.concat(note)
      } else {
        return notesFound
      }
    }, []) : notes

    setVisibleNotes(searchResult)
  }

  const classes = useStyles()
  return (
    <div className={classes.sidebarContainer}>
      <Button 
        onClick = {newNoteButtonClicked}
        className={classes.newNoteBtn} > 
        {
          newNoteStatus ? 'Cancel' : 'Add New'
        }
      </Button>
      {
        newNoteStatus ? 
          <div>
            <input type='text'
              className={classes.newNoteInput}
              placeholder='Enter note title'
              onKeyUp={updateTitle}
            />
            <Button 
              className={classes.newNoteSubmitBtn}
              onClick={newNote}>Submit</Button>
          </div> :
          null
      }
      <input type='text'
        className={classes.searchBox}
        placeholder='Search'
        onChange={(e) => {setTerm(e.target.value)}}
        onKeyUp={performSearch}
      />
      <Notes 
        notes={visibleNotes} 
        setSelectedNoteIndex={setSelectedNoteIndex} 
        setSelectedNote={setSelectedNote}
        selectedNoteIndex = {selectedNoteIndex}
        deleteNote={deleteNote}
        />     
      <DeleteDialog 
        note={tempNote} 
        warningStatus={warningStatus} 
        setWarningStatus={setWarningStatus}
        remove={remove}      
        />
    </div>
  )
}

export default SideBar