import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'antd/dist/reset.css'
// import { ToastContainer } from "react-toastify";
import {Provider } from 'react-redux'


import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrat/dist/css/bootstrap.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    // <ToastContainer />
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
    </Provider>
);
