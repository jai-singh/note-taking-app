import React from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import SideBarItemComponent from './SideBarItemComponent'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  notesList : {
    padding: '0px'
  }
})

//this component will map list of notes to the sidebar
const Notes = ({ notes, selectedNoteIndex, setSelectedNoteIndex, setSelectedNote, deleteNote }) => {

  const classes = useStyles()
  
  return(
    <div>
      <List className={classes.notesList}>
      {
        notes.map( note =>
          <div key={note.id}>
            <SideBarItemComponent 
              note = {note}
              selectedNoteIndex = {selectedNoteIndex}
              setSelectedNoteIndex = {setSelectedNoteIndex}
              setSelectedNote = {setSelectedNote}
              deleteNote = {deleteNote}
            />
            <Divider />
          </div>
        )  
      }
      </List>
    </div>
  )
}

export default Notes