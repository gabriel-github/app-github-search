import ReactDOM from "react-dom";
import App from "./App";
import { UsersProvider } from "./context/usersContext";

import "./styles/global.scss";

ReactDOM.render(
  <UsersProvider>
    <App />
  </UsersProvider>,
  document.getElementById("root")
);
