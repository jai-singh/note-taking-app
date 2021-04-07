import React, { useState,  useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AlertDialog({ note, warningStatus, setWarningStatus, remove }) {
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    if(open !== warningStatus) setOpen(warningStatus)
  },[warningStatus])
  
  const handleClose = () => {
    setOpen(false)
    setWarningStatus(false)
  }

  const yes = () => {
    remove(note) 
    setWarningStatus(false)   
    setOpen(false)
  }

  const no = () => {
    setWarningStatus(false)   
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to delete note titled ${note.title}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={yes} color="primary">
            Yes
          </Button>
          <Button onClick={no} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}