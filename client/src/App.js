import React from 'react';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    posts: []
  }

  handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`)
  }

  render(){
    axios.get("/api/posts")
      .then(res => this.setState({ posts: res.data }))
    return (
      <div className="App">
        { this.state.posts.map(post => ( 
          <div>
            Author: { post.author }
            <br/>
            Title: { post.title }
            <br/> 
            Body: { post.body }
            <button onClick={ () => this.handleDelete (post._id) }>Delete this post</button>
          </div>
        ))}
      </div>
    )
  }
}
