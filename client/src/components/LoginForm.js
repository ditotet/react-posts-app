import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const LoginForm = (props) => {
  const classes = props.classes

  const [state, setState] = useState({
    userName: '',
    password: '',
    errorText: {
      userName: '',
      password: ''
    }
  })

  const handleChange = (e, fieldName) => {
    setState({
      ...state,
      [fieldName]: e.target.value,
      errorText: {
        userName: '',
        password: ''
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/login', {
      userName: state.userName,
      password: state.password
    }).then(res => {
      if (res.data.success) {
        props.history.push('/posts')
      } else  {
        let errorText = state.errorText
        if (res.data.errorCode == 0) {
          errorText.password = `Password for username '${state.userName}' is incorrect`
        } else if (res.data.errorCode == 1) {
          errorText.userName = `User '${state.userName}' does not exist`  
        }
        setState({
          ...state,
          errorText: errorText
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <form noValidate onSubmit={e => handleSubmit(e) }>
      <TextField
        fullWidth
        required
        id="user-name"
        label="User Name"
        value={state.userName}
        onChange={ (e) => handleChange(e, 'userName') }
        margin="normal"
        variant="outlined"
        helperText={ state.errorText.userName }
        error= { state.errorText.userName.length > 0 }
        className={ classes.inputField }
      />
      <TextField
        fullWidth
        required
        id="password"
        label="Password"
        type="password"
        value={ state.password }
        onChange={ (e) => handleChange(e, 'password') }
          margin="normal"
          variant="outlined"
        helperText={ state.errorText.password }
        error= { state.errorText.password.length > 0 }
        className={ classes.inputField }
      />
      <Button fullWidth 
              variant="contained"  
              color="primary" 
              type="submit"
              className={ classes.inputButton }>Log in</Button>
    </form>
  )
}

export default LoginForm
