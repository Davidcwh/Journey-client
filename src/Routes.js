import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from './containers/Home';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>


      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}