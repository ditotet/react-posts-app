import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'


const PostItem = (props) => {
  return (
    <Card maxWidth={300} m={3} fullWidth className={props.className}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { props.title }
          </Typography>
          <Typography  color="textSecondary">
            By { props.author }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read Post
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostItem