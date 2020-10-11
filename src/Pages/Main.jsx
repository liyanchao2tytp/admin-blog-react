import React from "react";
import { BrowserRouter as Router, Redirect, Route,Switch } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";
export default function Main() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login"></Redirect>
        <Route path="/login/" exact component={Login}></Route>
        <Route path="/admin" component={AdminIndex}></Route>
      </Switch>
    </Router>
  );
}