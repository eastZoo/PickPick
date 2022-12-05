import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import loadUser from "./components/auth/loadUser";
import store, { history } from "./store";
import { Provider } from "react-redux";
import { connectRouter } from "connected-react-router";

// loadUser();

ReactDOM.render(
  <Provider store={store}>
    <connectRouter history={history}>
      <App />
    </connectRouter>
  </Provider>,
  document.getElementById("root")
);