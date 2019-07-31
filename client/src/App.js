import React from 'react';
import './App.css';
import PostList from './components/PostList.js';
import AddPost from './components/AddPost.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


export default class App extends React.Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ PostList } />
          <Route path="/add" exact component={ AddPost } />
        </Switch>
      </Router>
    )
  }
}
