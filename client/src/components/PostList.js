import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'



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
          <>
          <Card maxWidth={300} m={3} fullWidth>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  { post.title }
                </Typography>
                <Typography  color="textSecondary">
                  By { post.author }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  { post.body }
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
          </>
        ))}
        <Link to="/add">
          Add Post
        </Link>
      </div>
      
    )
  }
}
