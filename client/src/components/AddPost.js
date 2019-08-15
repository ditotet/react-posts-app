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
  styles = {
    container: {
      padding: 30
    },
  }

  state = {
    title: "",
    body: ""
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

  handleSubmit = (e) => {
    console.log(this.state.title);
    console.log(this.state.body);
    e.preventDefault()
    axios.get('api/userName')
      .then(res => {
        axios.post('api/posts', {
          author: res.data.userName,
          title: this.state.title,
          body: this.state.body
        }).then((res) => {
          console.log(res.data)
          // this.props.history.push('/posts')
        }).catch((err) => {
          console.log(err)
        })
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
      <Container maxWidth="md" style={this.styles.container}>
      <Typography variant="h4" component="h2">
        Add Post
      </Typography>
      <form noValidate onSubmit={e => this.handleSubmit(e) }>
        <TextField
          label="Title"
          placeholder="Title"
          multiline={true}
          margin="normal"
          variant="outlined"
          onChange={e => this.handleTitleChange(e) }
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
          onChange={e => this.handleBodyChange(e) }
          style={{
            width: "100%",
            margin: '20px auto'
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Post
        </Button>
        <Button href="/posts">
          Back
        </Button>
      </form>
      </Container>
      </>
    )
  }
}
