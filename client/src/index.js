import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";

import App from "./App";
import Providers from "./shared/utils/Providers/Providers";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

dotenv.config();

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);

reportWebVitals();
