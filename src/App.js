import React from 'react';
import Button from 'antd'
import './App.css';
import MainPage from '../src/pages/MainPage'
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom'
import Page1 from './pages/Page1.js'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'

console.log("inside App.js")
function App() {
  return (

    // <BrowserRouter basename="/ChooseWisely">
    //   <Link to="/">Home</Link>
    //   <Link to="/mainPage">MainPage</Link>
    //   <Route path="/" exact component={MainPage} />
    //   <Route path="/mainPage" component={MainPage} />
    //   <Route path="/coursePage1" component={Page1} />
    //   <Route path="/account" component={AccountPage} />

    // </BrowserRouter>
    <Button type="primary" size="large">HI I AM PUBLISHED</Button>

  );
}

export default App;
