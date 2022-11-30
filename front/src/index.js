import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import loadUser from "./components/auth/loadUser";
import store, { history } from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);