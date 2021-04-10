import React, { useState } from "react";
import bg from "../bg.svg";
import Button from '@material-ui/core/Button'
import SignInDialog from './SignInDialog'
import SignUpDialog from './SignUpDialog'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  paper: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Roboto, sans-serif'
  },
  header: {
    position: 'relative'
  },
  bg: {
    position: 'absolute',
    zIndex: '-1',
    width: '1630px',
    right: '-50%',
    top: '-20px'
  },
  contentDiv: {
    paddingTop: '150px'
  },
  heading: {
    fontSize: '75px'
  },
  information: {
    width: '550px',
    fontSize: '20px',
    lineHeight: '28px'
  },
  buttonGroup: {
    paddingTop: '50px'
  },
  button:{
    padding: '20px',
    marginRight: '10px',
    width: '170px',
    borderRadius: '40px',
    color: 'blue',
    fontSize: '20px',
    textAlign: 'center',
    textDecoration: 'none',
    border: '1px solid blue',
    '&:hover': {
      background: 'blue',
      color: '#eee',
    }
  }

}))

const Main = ({ userSignIn, userSignUp }) => {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const classes = useStyle()

  const signInClicked = () => {
    setShowSignIn(true)
  }

  const signUpClicked = () => {
    setShowSignUp(true)
  }

  return (
    <div className={classes.paper}>
      <header className={classes.header}>
        <img src={bg} alt='background' className={classes.bg} />
        <div className={classes.contentDiv}>
          <h1 className={classes.heading}>
            Note Taking Web App
            <br />
          </h1>
          <p className={classes.information}>
            Whatever you have in your mind just type it in this elegant app.
          </p>
          <div className={classes.buttonGroup}>
            <Button onClick={signInClicked} className={classes.button}>Sign in</Button>
            <Button onClick={signUpClicked} className={classes.button}>Sign Up</Button>
          </div>
        </div>
      </header>
      <SignInDialog 
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
        userSignIn={userSignIn}
      />
      <SignUpDialog 
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        userSignUp={userSignUp}
      />
    </div>
  );
};

export default Main;