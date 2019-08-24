import React, { Component, useState } from 'react'
import RegisterPage from '../RegisterForm';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import LoginPage from '../LoginForm';

const useStyles = makeStyles(theme => ({
  inputField: {
    marginTop: 20,
    marginBottom: 20
  },
  inputButton: {
    marginTop: 30
  },
  formCard: {
    maxWidth: 400,
    padding: 50,
    textAlign: 'center',
    margin: '50px auto'
  },
  formHeader: {
    marginBottom: 20
  }
}))

const Authentication = (props) => {
  const classes = useStyles()

  const [state, setState] = useState({
    page: 0
  })

  const handleTabChange = (e, val) => {
    setState({
      page: val
    })
  }
    
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            Welcome to Posts App
          </Toolbar>
        </Container>
      </AppBar>
      <Card className={ classes.formCard }>
        <Typography className={ classes.formHeader } component="h5" variant="h5">
          { state.page == 0 ? "Log in" : "Create account" }
        </Typography>
        <Tabs 
          value={state.page}
          indicatorColor="primary"
          textColor="primary"
          onChange={ handleTabChange }
          centered
          >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        { state.page == 0 ? <LoginPage classes={ classes } { ...props } /> : <RegisterPage classes={ classes } { ...props } /> }
      </Card>
    </>
  )
}

export default Authentication