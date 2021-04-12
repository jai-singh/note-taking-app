import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import { removeHtmlTags } from '../helpers/removeHtmlTags'

const useStyles = makeStyles({
  listItem: {
    cursor: 'pointer',
    '&:hover':{
      background: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)',
    }
  },
  selectedItem: {
    cursor: 'pointer',
    background: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)',
  },
  textSection: {
    width: 'calc(100% - 15px)'
  },  
  deleteIcon: {
    position: 'absolute',
    right: '5px',
    top: 'calc(50% - 15px)',
    '&:hover': {
      color: 'red'
    }
  }
});

const SideBarItemComponent = ({ note, selectedNoteIndex, setSelectedNoteIndex, 
  selectedNote, setSelectedNote, deleteNote, updateNow }) => {

  const classes = useStyles()

  const selectNote = () => {
    if(selectedNote !== null) updateNow()
    setSelectedNote(note)
    setSelectedNoteIndex(note.id)
  }
  // debugger
  return(
    <div key={note.id}>
      {/* {console.log(typeof note.content)} */}
      <ListItem
        className = {classes.listItem}
        selected = {selectedNoteIndex === note.id ? true : false}
        alignItems = 'flex-start'
        classes={{ selected: classes.selectedItem }}>
          <div 
            className={classes.textSection}
            onClick={selectNote}
          >
            <ListItemText
              primary={note.title}
              secondary={removeHtmlTags(note.content.substring(0,100)).substring(0, 25) + '...'}
            />
          </div>
          <DeleteIcon onClick={() => deleteNote(note)}
            className={classes.deleteIcon}></DeleteIcon>
      </ListItem>
    </div>
  )
}

export default SideBarItemComponent