import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { loadUser } from "./redux/actions/auth";
import { DARK_MODE, LIGHT_MODE, LOGOUT } from "./redux/actions/types";

import Home from "./components/Home";
import Register from "./components/auth/Register";
import Main from "./components/auth/Main";
import About from "./components/about/About";
import NotFound from "./components/layout/NotFound";
import store from "./store";
import setAuthToken from './utils/setAuthToken'

import "./App.css";

function App() {
    useEffect(() => {
      // check for token in LS
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      store.dispatch(loadUser());
      // log user out from all tabs if they log out in one tab
      window.addEventListener("storage", () => {
        if (!localStorage.token) store.dispatch({ type: LOGOUT });
      });
    }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Main} />
            <Route exact path='/about' component={About} />
            <Route component={NotFound} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
