import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";

export default function Main() {
  return (
    <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/home/" component={AdminIndex}></Route>
    </Router>
  );
}
