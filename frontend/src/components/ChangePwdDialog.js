import React, { useState,  useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import ChangePwd from './ChangePwd'

export default function SignInDialog({ showChangePwd, setShowChangePwd, handlePwdChange }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(open !== showChangePwd) setOpen(showChangePwd)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showChangePwd])

  const handleClose = () => {
    setOpen(false)
    setShowChangePwd(false)
  }

  return(
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <ChangePwd handlePwdChange={handlePwdChange}/>
    </Dialog>
  )
}