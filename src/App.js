import React from 'react';

import './App.css';
import MainPage from '../src/pages/MainPage'
import {Route,Switch} from 'react-router-dom'

function App() {
  return (
    
    <Switch>
    <Route path="/" exact component={MainPage}/>
    
    </Switch>
     

   
  );
}

export default App;
