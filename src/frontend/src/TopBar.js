import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import logo from './aulogo.png'

import {Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  brand:{
    position: "absolute",      
    left: "48%"
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [redClub, setRedClub] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClub = () => {
    setRedClub(<Redirect to={{pathname: "/selectclubs",}} />);
  };
  const handleOut = () => {
    localStorage.setItem('document',JSON.stringify({
      cur_user:0,
      is_new:false,
      is_auth:false,
      is_org:false,
    }));
    
    window.open("http://localhost:3000/","_self");

  };
  const handleDash = () => {
    window.open("http://localhost:3000/dashboard","_self");

  };
  const handleAbout = () => {
    window.open("http://localhost:3000/aboutus","_self");
    //return <Redirect to={{pathname: "/addevent",}} />

  };
  function handleName(){
    
    const documentData = JSON.parse(localStorage.getItem('document'));
    if (localStorage.getItem('document')) {
      if(documentData.fname!=undefined){
        return("Hello, "+documentData.fname)

      }
    }
  }

  return (
    <div className={classes.root}>
      {handleAbout}
      <AppBar position="fixed">
        <Toolbar>
          <Box className={classes.title} margin={2}>
            <img src={logo} width={150} />
          </Box>
          <Typography variant="h6" className={classes.brand}>
            EventLog
          </Typography>
          <div>

              <Button variant="contained" color="other" onClick={handleDash}>Dashboard</Button>
              <Button variant="contained" color="other" onClick={handleAbout}>About</Button>
          
              <Button variant="" color="other">{handleName()}</Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClub}>Select Clubs</MenuItem>
                <MenuItem onClick={handleOut}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
        {redClub}
      </AppBar>
    </div>
  );
}