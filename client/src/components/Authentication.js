import React, { Component } from 'react'
import RegisterPage from './RegisterForm';
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
import Tabs from '@material-ui/core/Tabs'
import LoginPage from './LoginForm';

export default class Authentication extends Component {
  styles = {
    typography: {
      marginBottom: 20
    },
    container: {
      contentAlign: 'center',
      margin: 'auto',
      width: '100%'
    },
    card: {
      width: 400,
      padding: 30,
      textAlign: 'center',
      margin: '50px auto'
    },
    inputField: {
      width: "100%",
      margin: '20px auto'
    },
    button: {
      marginTop: 30
    },
  }

  state = {
    page: 1
  }

  handleTabChange = (e, val) => {
    this.setState({
      page: val
    })
    console.log(val)
  }
  
  render() {
    return (
      <div style={this.styles.container}>
        <AppBar position="static">
          <Container maxWidth="md">
            <Toolbar>
              Welcome to Posts App
            </Toolbar>
          </Container>
        </AppBar>
        <Card style={this.styles.card}>
          <Typography style={this.styles.typography} component="h5" variant="h5">
            { this.state.page == 0 ? "Log in" : "Create account" }
          </Typography>
          <Tabs 
            value={this.state.page}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
            centered
            >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          { this.state.page == 0 ? <LoginPage styles={ this.styles } /> : <RegisterPage styles={ this.styles } /> }
        </Card>
      </div>
    )
  }
}
