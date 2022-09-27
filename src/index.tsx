import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.css";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import Auth from "./service/auth";
import TweetRepository from "./service/tweet-repository";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const auth = new Auth();
const tweetRepository = new TweetRepository();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} tweetRepository={tweetRepository} />
    </BrowserRouter>
  </React.StrictMode>
);
