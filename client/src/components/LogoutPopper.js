import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const LogoutPopper = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }

  const handleNo = () => {
    setAnchorEl(null)
  }

  const handleYes = () => {
		Axios.post('/logout', {})
			.then(res => {
				props.history.push('/')
			})
	}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="inherit" onClick={handleClick}>
        Logout
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              <Typography className={classes.typography}>Are you sure?</Typography>
              <Button color="primary" onClick={ handleYes }>Yes</Button>
              <Button color="primary" onClick={ handleNo }>No</Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default LogoutPopper