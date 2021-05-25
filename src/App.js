import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./screens/login/Login";
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;