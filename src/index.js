import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import store from "./store/index";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axios.defaults.baseURL = "http://localhost:8000/api/";
// axios.defaults.baseURL = "http://localhost:11000/api/v1";
// axios.defaults.baseURL = "https://fix234.everythingeasyng.com/api/v1";

React.icons = icons;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
