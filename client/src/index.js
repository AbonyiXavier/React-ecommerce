import React from "react";
import ReactDOM from "react-dom";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCompass } from "@fortawesome/free-solid-svg-icons";

import "./Resources/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "./reducers";

const createStoreWithMiddle = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddle(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// library.add(faCompass);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
