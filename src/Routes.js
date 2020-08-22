import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </Switch>
  );
}