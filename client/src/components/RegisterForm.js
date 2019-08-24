import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const RegisterForm = (props) => {
  const classes = props.classes

  const [state, setState] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    errorText: {
      userName: '',
      password: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    let errorText = state.errorText
    if(state.password === state.confirmPassword) {
      errorText.confirmPassword = ''
    }
    if(state.password.length >= 8) {
      errorText.password = ''
    }
    setState({
      ...state,
      errorText: errorText
    })
  }, [state.userName, state.password, state.confirmPassword])

  const handleChange = (e, fieldName) => {  
    setState({
      ...state,
      [fieldName]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/register', {
      userName: state.userName,
      password: state.password
    }).then(res => {
      if(res.data.success) {
        axios.post('/login', {
          userName: state.userName,
          password: state.password
        }).then(res => {
          if (res.data.success) {
            props.history.push('/posts')
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

  const validatePassword = () => {
    let errorText = state.errorText
    if(state.password.length < 8) {
      errorText.password = "Password must be 8 letters at least"
    } else {
      errorText.password = ""
    }
    if(state.password.length > 0 && state.confirmPassword.length > 0 && state.password !== state.confirmPassword) {
      errorText.confirmPassword = "Passwords must match"
    }
    setState({
      ...state,
      erroText: errorText
    })
  }

  const validateConfirmPassword = () => {
    let errorText = state.errorText 
    if(state.password !== state.confirmPassword) {
      errorText.confirmPassword = "Passwords must match"
    }
    setState({
      ...state,
      erroText: errorText
    })
  }
  return (
    <form noValidate onSubmit={ handleSubmit }>
      <TextField
        required
        fullWidth
        id="user-name"
        label="User Name"
        value={state.userName}
        onChange={ (e) => handleChange(e, 'userName') }
        margin="normal"
        variant="outlined"
        helperText={ state.errorText.userName }
        error={ state.errorText.userName.length > 0 }
        className={ classes.inputField }      
        />
      <TextField
        required
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={state.password}
        onChange={ (e) => handleChange(e, 'password') }
        margin="normal"
        variant="outlined"
        onBlur={ validatePassword }
        helperText={ state.errorText.password }
        error={ state.errorText.password.length > 0 }
        className={ classes.inputField }
      />
      <TextField
        required
        fullWidth
        id="confirm-password"
        label="Confirm password"
        type="password"
        value={state.confirmPassword}
        onChange={ (e) => handleChange(e, 'confirmPassword') }
        margin="normal"
        variant="outlined"
        onBlur={ validateConfirmPassword }
        helperText={ state.errorText.confirmPassword }
        error={ state.errorText.confirmPassword.length > 0 }
        className={ classes.inputField }
      />
      <Button className={ classes.inputButton }
              fullWidth 
              variant="contained"  
              color="primary" 
              type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm
