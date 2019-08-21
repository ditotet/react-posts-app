import React, {useState, useEffect} from 'react';
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
import NavBar from '../NavBar';
import PostItem from '../PostItem';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  item: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const PostList = (props) => {
  const classes = useStyles()
  const [userName, setUserName] = useState('')
  const [posts, setPosts] = useState({
    loaded: false,
    list: []
  })

  const handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`)
  }

  useEffect(() => {
    axios.get("/api/posts")
      .then(res => setPosts({ loaded: true, list: res.data }))
    axios.get("/api/userName")
      .then(res => setUserName(res.data.userName))
  }, [])

  const postList = (
    posts.list.map(post => ( 
      <PostItem 
        title={ post.title }
        author = { post.author } 
        className={ classes.item }
        />
    ))
  )

  const progress = (
    <CircularProgress />
  )

  return (
    <>
      <NavBar userName={ userName } {...props}/>  
      <Container maxWidth="lg">
        <Box p={5}>
          <Typography variant="h4" component="h2">
            Posts
          </Typography>
          {posts.loaded ? postList : progress }
        </Box>
      </Container>
    </>   
  )
}

export default PostList
