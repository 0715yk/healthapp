import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/firestore";
import { RecoilRoot } from "recoil";

require("firebase/auth");

var firebaseConfig = {
  apiKey: "AIzaSyBTrGnUTsB07F0SQQl6PuA5D7xvYL7in5s",
  authDomain: "healthapp-beee1.firebaseapp.com",
  projectId: "healthapp-beee1",
  storageBucket: "healthapp-beee1.appspot.com",
  messagingSenderId: "1010814393862",
  appId: "1:1010814393862:web:6f6cd244fd1fe0382aed87",
  measurementId: "G-NJ9SC74VL7",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

export const db = firebase.firestore();
export const fbase = firebase;
