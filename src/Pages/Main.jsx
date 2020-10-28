import React from "react";
import { BrowserRouter as Router, Redirect, Route,Switch } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";

export default function Main() {
  return (
    <Router>
        <Redirect  from="/" to="/login"></Redirect>
        <Route path="/login/"  component={Login}></Route>
        <Route path="/home/"  component={AdminIndex}></Route>
    </Router>
  );
}
