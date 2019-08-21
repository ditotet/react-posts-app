import React from 'react';
import './App.css';
import PostList from './components/pages/PostList.js'
import AddPost from './components/pages/AddPost.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios'
import Authentication from './components/pages/Authentication';



export default class App extends React.Component {

  render(){
    axios.get("/").then(res => console.log(res))
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ Authentication } />
          <Route path="/posts" exact component={ PostList } />
          <Route path="/add" exact component={ AddPost } />
        </Switch>
      </Router>
    )
  }
}
