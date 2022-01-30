import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { EditPage } from "./pages/EditPage/EditPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { userStore } from "./redux/stores/userStore";

const rootElement = document.getElementById("root");
render(
  <Provider store={userStore}>
    <App/>
  </Provider>
, rootElement);
