import React, { useEffect, useState } from 'react'
import noteService from './services/noteService'
import SideBar from './components/SideBar'
import Editor from './components/Editor'
import './App.css'
import { debounce } from './helpers/debounce'
import UserMenu from './components/UserMenu'
import Main from './components/Main'
import loginService from './services/loginService'
import signupService from './services/signupService'
import Notification from './components/Notification'
import ChangePwdDialog from './components/ChangePwdDialog'


const App = () => {
  const [notes, setNotes] = useState([])
  const [visibleNotes, setVisibleNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [showChangePwd, setShowChangePwd] = useState(false)
  const [notificationType, setNotificationType] = useState('')

  let updatedNote = null

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
      noteService
      .getNotes()
      .then( notes => { 
        setNotes(notes)
        setVisibleNotes(notes) 
      })
    } 
  },[])

  const updateNoteInServer = async (note) => {    
    await noteService.updateNote(note.id, note)
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

  const userSignIn = (credentials) => {
    loginService.login(credentials)
      .then(data => {
        setUser(data)
        window.localStorage.setItem(
          'loggedNoteAppUser', JSON.stringify(data)
        )
        noteService.setToken(data.token)
        noteService
        .getNotes()
        .then( notes => { 
          setNotes(notes)
          setVisibleNotes(notes) 
          setNotificationType('error')
        })
      })
      .catch(e => {        
        const error = e.response.data.error || 'Something went wrong'
        setNotification(error)
        setShowNotification(true)
        setNotificationType('error')
      })    
  } 

  const userSignUp = (credentials) => {
    signupService.signup(credentials)
      .then(data => {    
        setUser(data)    
        window.localStorage.setItem(
          'loggedNoteAppUser', JSON.stringify(data)
        )
        noteService.setToken(data.token)
      })
      .catch(e => {
        const error = e.response.data.error || 'Something went wrong'
        setNotification(error)
        setShowNotification(true)
        setNotificationType('error')
      })    
  } 

  const logOut = () => {
    setUser(null)
    setNotes([])
    setVisibleNotes([])
    setSelectedNote(null)
    setSelectedNoteIndex(null)
    window.localStorage.clear()
  }

  const handlePwdChange = async (updatedCredentials) => {
    updatedCredentials = {
      ...updatedCredentials,
      username: user.username
    }
    noteService
      .updatePassword(updatedCredentials)
      .then(res => {
        const msg = res.msg
        setNotification(msg)
        setShowNotification(true)
        setNotificationType('success')
        setShowChangePwd(false)
      })
      .catch(e => {
        const error = e.response.data.error || 'Something went wrong'
        setNotification(error)
        setShowNotification(true)
        setNotificationType('error')
      })
  } 
    
  return (
    <div className='app-container'>
    {user ?
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
        <UserMenu 
          name={user.name}
          logOut={logOut}
          setShowChangePwd={setShowChangePwd}
        />
        <ChangePwdDialog 
          showChangePwd={showChangePwd}
          setShowChangePwd={setShowChangePwd}
          handlePwdChange={handlePwdChange}
        />
      </div>
    :
      <Main 
        userSignIn={userSignIn} 
        userSignUp={userSignUp}
      />
    }
      <Notification 
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        notification={notification}
        type={notificationType}
      />      
    </div>
  )
}

export default App