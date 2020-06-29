import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './styles.css';
import {MainPage} from './components/mainpage/mainpage.component.jsx';
import {BlogPage} from './components/blogpage/blogpage.component.jsx';
import {PageNotFound} from './components/pagenotfound/pagenotfound.component.jsx';


function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <MainPage></MainPage>
      </Route>
      <Route path='/blog'>
        <BlogPage></BlogPage>
      </Route>
      <Route path='/'>
        <PageNotFound></PageNotFound>
      </Route>
    </Switch>

  );
}

export default App;
