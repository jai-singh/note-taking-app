import React, { useState,  useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import SignIn from './SignIn'

export default function SignInDialog({ showSignIn, setShowSignIn, userSignIn }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(open !== showSignIn) setOpen(showSignIn)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showSignIn])

  const handleClose = () => {
    setOpen(false)
    setShowSignIn(false)
  }

  return(
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <SignIn userSignIn={userSignIn}/>
    </Dialog>
  )
}