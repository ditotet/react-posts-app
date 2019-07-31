import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class PostList extends React.Component {
  state = {
    posts: []
  }

  handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`)
  }

  render() {
    axios.get("/api/posts")
      .then(res => this.setState({ posts: res.data }))
    return (
      <div>
        { this.state.posts.map(post => ( 
          <div>
            Author: { post.author }
            <br/>
            Title: { post.title }
            <br/> 
            Body: { post.body }
            <button onClick={ () => this.handleDelete (post._id) }>Delete this post</button>
          </div>
        )) }
        <Link to="/add">
          Add Post
        </Link>
      </div>
      
    )
  }
}
