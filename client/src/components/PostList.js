import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress'





export default class PostList extends React.Component {
  styles = {
    postCard: {
      marginTop: 30,
      marginBottom: 30
    },
    container: {
      padding: 30
    },
    center: {
      margin: 'auto'
    }
  }


  state = {
    userName: "",
    postLoaded: false,
    posts: []
  }

  handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`)
  }

  componentDidMount() {
    axios.get("/api/posts")
      .then(res => this.setState({ posts: res.data, postsLoaded: true}))
    axios.get("/api/userName")
      .then(res => this.setState({ userName: res.data.userName }))
    console.log("ASDASDSA")
  }

  

  render() {
    const postList = (
      this.state.posts.map(post => ( 
        <Card maxWidth={300} m={3} fullWidth style={this.styles.postCard}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                { post.title }
              </Typography>
              <Typography  color="textSecondary">
                By { post.author }
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Read Post
            </Button>
          </CardActions>
        </Card>
      ))
    )

    const progress = (
      <div style={this.styles.center}>
        <CircularProgress style={this.styles.load}/>
      </div>
    )

    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="md">
            <Toolbar>
              { `Welcome ${this.state.userName}` }
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="md" style={this.styles.container}>
        <Typography variant="h4" component="h2">
          Posts
        </Typography>
        {this.state.postsLoaded ? postList : progress }
        <Button href="/add" variant="contained" color="primary">
          Add Post
        </Button>
        </Container>
      </div>
      
    )
  }
}
