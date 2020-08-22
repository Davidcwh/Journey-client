import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>


      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}