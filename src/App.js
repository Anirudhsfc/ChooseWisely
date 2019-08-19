import React from "react";
import ReactGA from 'react-ga';
import { Button } from "antd";
import "./App.css";
import MainPage from "../src/pages/MainPage";
import { Route, Switch, Link, BrowserRouter,HashRouter } from "react-router-dom";
import Page1 from "./pages/Page1.js";
import AccountPage from "./pages/AccountPage";
import { Review } from "./pages/Review";
import LoginPage from "./pages/LoginPage";
import ReviewPage from './pages/ReviewPage'
import ShowAllPage from './pages/ShowAllPage'


function initializeReactGA() {
  console.log("analysinggggg")
  ReactGA.initialize('UA-123791717-1');
  ReactGA.pageview('/');
}
console.log("inside App.js");
function App() {
  initializeReactGA()
  return (
    <HashRouter basename="/ChooseWisely">
      {/* <Link to="/">Home</Link>
      <Link to="/mainPage">MainPage</Link> */}
      {/* <Link to="/review">REVIEW</Link>
      <Link to="/reviewPage">REVIEW PAGE</Link> */}
      <Route path="/" exact component={ReviewPage} />
      <Route path="/mainPage" component={MainPage} />
      {/* <Route path="/coursePage1" component={Page1} /> */}
      {/* <Route path="/account" component={AccountPage} /> */}
      {/* <Route path="/review" component={Review} /> */}
      <Route path="/reviewPage" component={ReviewPage}/>
      <Route path="/showAllPage" component={ShowAllPage}/>
    </HashRouter>
    // <Button type="primary" size="large">HI I AM PUBLISHED</Button>
  );
}

export default App;
