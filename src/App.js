import React from "react";
import { Button } from "antd";
import "./App.css";
import MainPage from "../src/pages/MainPage";
import { Route, Switch, Link, BrowserRouter } from "react-router-dom";
import Page1 from "./pages/Page1.js";
import AccountPage from "./pages/AccountPage";
import { Review } from "./pages/Review";
import LoginPage from "./pages/LoginPage";
import ReviewPage from './pages/ReviewPage'

console.log("inside App.js");
function App() {
  return (
    <BrowserRouter basename="/ChooseWisely">
      {/* <Link to="/">Home</Link>
      <Link to="/mainPage">MainPage</Link> */}
      <Link to="/review">REVIEW</Link>
      <Route path="/" exact component={MainPage} />
      <Route path="/mainPage" component={MainPage} />
      <Route path="/coursePage1" component={Page1} />
      <Route path="/account" component={AccountPage} />
      <Route path="/review" component={Review} />
      <Route path="/reviewPage" component={ReviewPage}/>
    </BrowserRouter>
    // <Button type="primary" size="large">HI I AM PUBLISHED</Button>
  );
}

export default App;
