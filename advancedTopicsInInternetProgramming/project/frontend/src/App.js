import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import {Dashboard} from "./components/Dashboard";
import {Homepage} from "./components/Homepage";
import {Footer} from "./components/Footer";
import {User} from "./components/User";
import {PrivateRoute} from "./components/PrivateRoute";

export const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard/>
          </PrivateRoute>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
  );
}
