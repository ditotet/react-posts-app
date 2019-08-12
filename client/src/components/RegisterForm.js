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
    confirmPassword: "",
    errorText: {
      userName: "",
      password: "",
      confirmPassword: "",
    }
  }

  handleChange = (e, fieldName) => {  
    this.setState({
      [fieldName]: e.target.value
    }, () => {
      let errorText = this.state.errorText
      if(this.state.password === this.state.confirmPassword) {
        errorText.confirmPassword = ""
      }
      if(this.state.password.length >= 8) {
        errorText.password = ""
      }
      this.setState({
        erroText: errorText
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/register', {
      userName: this.state.userName,
      password: this.state.password
    }).then(res => {
      if(res.data.success) {
        axios.post('/login', {
          userName: this.state.userName,
          password: this.state.password
        }).then(res => {
          if (res.data.success) {
            this.props.history.push('/posts')
          } else {
            console.log('unknown error')
          }
        })
      } else {
        console.log(res.data.error)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  validatePassword = () => {
    let errorText = this.state.errorText
    if(this.state.password.length < 8) {
      errorText.password = "Password must be 8 letters at least"
    } else {
      errorText.password = ""
    }
    if(this.state.password.length > 0 && this.state.confirmPassword.length > 0 && this.state.password !== this.state.confirmPassword) {
      errorText.confirmPassword = "Passwords must match"
    }
    this.setState({
      erroText: errorText
    })
  }

  validateConfirmPassword = () => {
    let errorText = this.state.errorText 
    if(this.state.password !== this.state.confirmPassword) {
      errorText.confirmPassword = "Passwords must match"
    }
    this.setState({
      erroText: errorText
    })
  }
  
  render() {
    const { styles } = this.props
    return (
      <form noValidate onSubmit={ this.handleSubmit }>
        <TextField
          required
          id="user-name"
          label="User Name"
          value={this.state.userName}
          onChange={ (e) => this.handleChange(e, 'userName') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
          helperText={ this.state.errorText.userName }
          error={ this.state.errorText.userName.length > 0 }
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={ (e) => this.handleChange(e, 'password') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
          onBlur={ this.validatePassword }
          helperText={ this.state.errorText.password }
          error={ this.state.errorText.password.length > 0 }
        />
        <TextField
          required
          id="confirm-password"
          label="Confirm password"
          type="password"
          value={this.state.confirmPassword}
          onChange={ (e) => this.handleChange(e, 'confirmPassword') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
          onBlur={ this.validateConfirmPassword }
          helperText={ this.state.errorText.confirmPassword }
          error={ this.state.errorText.confirmPassword.length > 0 }
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
