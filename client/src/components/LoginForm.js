import React, { Component } from 'react'
import axios from 'axios';
import { log } from 'util';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

export default class LoginForm extends Component {
  
  state = {
    userName: "",
    password: "",
    errorText: {
      userName: "",
      password: ""
    }
  }

  handleChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
      errorText: {
        userName: "",
        password: ""
      }
    })
    console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/login', {
      userName: this.state.userName,
      password: this.state.password
    }).then(res => {
      if (res.data.success) {
        this.props.history.push('/posts')
      } else  {
        let errorText = this.state.errorText
        if (res.data.errorCode == 0) {
          errorText.password = `Password for username '${this.state.userName}' is incorrect`
        } else if (res.data.errorCode == 1) {
          errorText.userName = `User '${this.state.userName}' does not exist`  
        }
        this.setState({
          errorText: errorText
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  
  render() {
    const { styles } = this.props
    return (
      <form noValidate onSubmit={e => this.handleSubmit(e) }>
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
          error= { this.state.errorText.userName.length > 0 }
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          value={ this.state.password }
          onChange={ (e) => this.handleChange(e, 'password') }
            margin="normal"
            variant="outlined"
          style={ styles.inputField }
          helperText={ this.state.errorText.password }
          error= { this.state.errorText.password.length > 0 }
        />
        <Button style={ styles.button } 
                fullWidth 
                variant="contained"  
                color="primary" 
                type="submit">Log in</Button>
      </form>
    )
  }
}
