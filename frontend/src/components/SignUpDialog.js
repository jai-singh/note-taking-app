import React, { useState,  useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import SignUp from './SignUp'

export default function SignInDialog({ showSignUp, setShowSignUp, userSignUp }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(open !== showSignUp) setOpen(showSignUp)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showSignUp])

  const handleClose = () => {
    setOpen(false)
    setShowSignUp(false)
  }

  return(
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <SignUp 
        userSignUp={userSignUp}
      />
    </Dialog>
  )
}