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
    password: ""
  }

  handleChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
      errorText: {
        [fieldName]: "blaaa"
      }
    })
    console.log(this.state)
  }

  handleSubmit = () => {
    axios.post('/login', {
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
          required
          id="user-name"
          label="User Name"
          value={this.state.userName}
          onChange={ (e) => this.handleChange(e, 'userName') }
          margin="normal"
          variant="outlined"
          style={ styles.inputField }
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
