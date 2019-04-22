import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./settings";
import registerServiceWorker from "./registerServiceWorker";
import { App } from "./App";
import styles from "./app.css";

const rootElement = document.getElementById("root");
rootElement.classList.add(styles.root);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
