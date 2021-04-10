import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '32px',
    marginBottom: '32px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function ChangePwd( { handlePwdChange } ) {
  const classes = useStyles()
  const [ currentPwd, setCurrentPwd ] = useState('')
  const [ newPwd, setNewPwd ] = useState('')

  const pwdChange = (event) => {
    event.preventDefault()
    const credentials = {
      currentPassword: currentPwd,
      newPassword: newPwd
    }
    handlePwdChange(credentials)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="curresntPwd"
            label="Current Password"
            type="password"
            id="curresntPwd"
            onChange={(e) => setCurrentPwd(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPwd"
            label="New Password"
            type="password"
            id="newPwd"            
            onChange={(e) => setNewPwd(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={pwdChange}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
