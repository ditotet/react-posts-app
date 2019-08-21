import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Popper from '@material-ui/core/Popper'
import LogoutPopper from '../LogoutPopper'
import NavBar from '../NavBar';

const AddPost = (props) => {

  const [userName, setUserName] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  
  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get('api/userName')
      .then(res => {
        axios.post('api/posts', {
          author: userName,
          title: title,
          body: body
        }).then((res) => {
          console.log(res.data)
          this.props.history.push('/posts')
        }).catch((err) => {
          console.log(err)
        })
      }) 
  }

  useEffect(() => {
    axios.get('api/userName')
      .then(res => {
        setUserName(res.data.userName)
      })
  }, [])

  return (
    <>
    <NavBar userName={ userName } {...props}/>
    <Container maxWidth="lg">
      <Box p={5}>
        <Typography variant="h4" component="h2">
          Add Post
        </Typography>
        <form noValidate onSubmit={e => handleSubmit(e) }>
          <TextField
            label="Title"
            placeholder="Title"
            multiline={true}
            margin="normal"
            variant="outlined"
            onChange={e => handleTitleChange(e) }
            fullWidth
          />
          <TextField
            label="Body"
            placeholder="Enter body of your post"
            multiline={true}
            rows={20}
            rowsMax={100}
            margin="normal"
            variant="outlined"
            onChange={e => handleBodyChange(e) }
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add Post
          </Button>
          <Button href="/posts">
            Back
          </Button>
        </form>
      </Box>
    </Container>
    </>
  )
}

export default AddPost
