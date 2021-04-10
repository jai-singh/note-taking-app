import React, { useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ErrorNotification = ({showNotification, setShowNotification, notification, type}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(open!==showNotification) setOpen(showNotification)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[showNotification])
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    setShowNotification(false)
  };
  return(
    <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {notification}
        </Alert>
      </Snackbar>
  )
}

export default ErrorNotification