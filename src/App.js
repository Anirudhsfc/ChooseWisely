import React from 'react';

import './App.css';
import MainPage from '../src/pages/MainPage'
import {Route,Switch} from 'react-router-dom'
import Page1 from './pages/Page1.js'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'
function App() {
  return (
    
    <Switch>
    <Route path="/" exact component={MainPage}/>
     <Route path="/mainPage"  component={MainPage}/>
    <Route path="/coursePage1" component={Page1}/>
    <Route path="/account" component={AccountPage}/>
    </Switch>
     
   
  );
}

export default App;
