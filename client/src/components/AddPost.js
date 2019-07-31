import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

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
      <div>
        <label>Author: </label>
        <input name="author" type="text" onChange={ this.handleAuthorChange } />
        <br/>
        <label>Title: </label>
        <input name="title" type="text" onChange={ this.handleTitleChange }/>
        <br/>
        <label>Body: </label>
        <input name="body" type="text" onChange={ this.handleBodyChange }/>
        <br/>
        <button onClick={ this.handleSubmit }>Add</button>
        <Link to="/">
          Back
        </Link>
      </div>
    )
  }
}
