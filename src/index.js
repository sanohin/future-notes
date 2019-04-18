import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./settings";
import registerServiceWorker from "./registerServiceWorker";
import { App } from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
