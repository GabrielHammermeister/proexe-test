import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import { userStore } from "./redux/stores/userStore";

const rootElement = document.getElementById("root");
render(
  <Provider store={userStore}>
    <App/>
  </Provider>
, rootElement);
