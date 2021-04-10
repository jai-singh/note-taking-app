import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  user: {
    background: 'linear-gradient(#36D1DC,#5B86E5)',
    left: 'calc(100% - 40px)',
    top: '0px',
    fontSize: '40px',
    position: 'absolute'
  },
  upperBar: {
    height: '40px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100% - 40px)',
    background: 'linear-gradient(#36D1DC,#5B86E5)',
  },
  menuOption: {
    '&:hover': {
      background: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)'
    }
  },
  name: {
    position: 'center',
    cursor: 'context-menu',
    '&:hover': {
      background: 'white  '
    }
  }
})

const UserMenu = ({name, logOut, setShowChangePwd }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangePwd = () => {
    setShowChangePwd(true)
    setAnchorEl(null)
  }

  return (
    <div>
      <div className={classes.upperBar}>
      </div>
      <AccountCircleIcon 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
        className={classes.user}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{paper: classes.menu}}      
      >
        <MenuItem className={classes.name}>{name}</MenuItem>
        <MenuItem onClick={handleChangePwd} className={classes.menuOption}>Change Password</MenuItem>
        <MenuItem onClick={logOut} className={classes.menuOption}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu