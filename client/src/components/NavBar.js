import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoutPopper from './LogoutPopper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
      <Toolbar>
        <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Typography variant="h6" className={classes.title}>
            PostsApp
          </Typography>
        </Button>
        <Button href="/add" color="inherit">
          Add Post
        </Button>
        <Typography variant="h6" className={classes.title}>
          { props.userName }
        </Typography>
        <LogoutPopper { ...props }  />  
      </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar