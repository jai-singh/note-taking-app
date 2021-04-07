import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { makeStyles } from '@material-ui/core/styles'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { debounce } from '../helpers/debounce'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  titleInput: {
    height: '40px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100% - 340px)',
    background: 'linear-gradient(#36D1DC,#5B86E5)',
    color: 'white',
    paddingLeft: '50px'
  },
  editIcon: {
    position: 'absolute',
    left: '310px',
    top: '12px',
    color: 'white',
    width: '10',
    height: '10'
  },
  editorContainer: {
    height: '100%',
    boxSizing: 'border-box'
  }  
});

const formats = [
  'font',
  'size',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'align',
  'color', 'background'
];

const modules = {
  toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
}


const Editor = ({ setSelectedNote, selectedNote , updateNoteInServer, changeContent}) => {
  const classes = useStyles()
  let updatedNote = null
  const [state, setState] = useState({ content: selectedNote.content })
  
  const update = debounce(() => {
    updateNoteInServer(updatedNote)
  }, 1000) 

  useEffect(() => {
    if (state.content !== selectedNote.content) setState({ content: selectedNote.content });
  }, [selectedNote.content]);
  
  const updateTitle = (updatedTitle) => {
    updatedNote = {
      ...selectedNote, title: updatedTitle
    }    
    update()
    setSelectedNote(updatedNote)    
  }
  
  return (
    <div className ={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder='Note title...'
          value={ selectedNote.title ? selectedNote.title : '' }
          onChange={(e) => updateTitle(e.target.value)}>
        </input>
      <ReactQuill 
        key="editor"
        value={state.content || ''}
        onChange={value => {
          setState({content: value})
          changeContent(value)
        }} 
        modules={modules} 
        formats={formats}  
      ></ReactQuill>
    </div>
  )
}

export default Editor