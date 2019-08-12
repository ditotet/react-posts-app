import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'





export default class AddPost extends React.Component {
  state = {
    author: "",
    title: "",
    body: ""
  }

  handleAuthorChange = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleBodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  handleSubmit = () => {
    console.log(this.state.author);
    console.log(this.state.title);
    console.log(this.state.body);
    
    axios.post('api/posts', {
      author: this.state.author,
      title: this.state.title,
      body: this.state.body
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            Welcome to Posts App
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md">
      <Typography variant="h4" component="h2">
        Add Post
      </Typography>
      <form noValidate onSubmit={ this.handleSubmit }>
        <TextField
          label="Body"
          placeholder="Body"
          multiline={true}
          margin="normal"
          variant="outlined"
          style={{
            width: "100%",
            margin: '20px auto'
          }}
        />
        <TextField
          label="Body"
          placeholder="Enter body of your post"
          multiline={true}
          rows={20}
          rowsMax={100}
          margin="normal"
          variant="outlined"
          style={{
            width: "100%",
            margin: '20px auto'
          }}
        />
        <Button type="submit" variant="contained" color="primary" href="/posts">
          Add Post
        </Button>
        <Button href="/">
          Back
        </Button>
      </form>
      </Container>
      </>
    )
  }
}
