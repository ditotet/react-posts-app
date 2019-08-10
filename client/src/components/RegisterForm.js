import React, { Component } from 'react'
import axios from 'axios';
import { log } from 'util';
import { sizing } from '@material-ui/system';
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

export default class RegisterForm extends Component {
  
  state = {
    userName: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value
    })
    console.log(this.state)
  }

  handleSubmit = () => {
    if(this.state.password !== this.state.confirmPassword) {
        return
    }
    axios.post('/register', {
      userName: this.state.userName,
      password: this.state.password
    }).then(res => {
      this.props.history.push('/posts')
    }).catch(err => {
      console.log(err)
    })
  }
  
  render() {
    const { styles } = this.props
    return (
      <form noValidate onSubmit={ this.handleSubmit }>
        <TextField
          id="user-name"
          label="User Name"
          value={this.state.userName}
          onChange={ (e) => this.handleChange(e, 'userName') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={ (e) => this.handleChange(e, 'password') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
        />
        <TextField
          id="confirm-password"
          label="Confirm password"
          type="password"
          value={this.state.confirmPassword}
          onChange={ (e) => this.handleChange(e, 'confirmPassword') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
        />
        <Button style={ styles.button } 
                fullWidth 
                variant="contained"  
                color="primary" 
                type="submit">Register</Button>
      </form>
    )
  }
}
