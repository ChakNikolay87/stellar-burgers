import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
