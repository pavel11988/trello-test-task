import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App/App.jsx";
import store from "./redux/store.js";
import actions from "./redux/actions";

const root = ReactDOM.createRoot(document.getElementById("root"));

function KeyPress(e) {
  const evtobj = e;
  if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
    evtobj.preventDefault();
    store.dispatch(actions.undo());
  }
  if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
    evtobj.preventDefault();
    store.dispatch(actions.redo());
  }
}
//bind the listener
window.onkeydown = KeyPress;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
