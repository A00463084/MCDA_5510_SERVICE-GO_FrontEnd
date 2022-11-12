import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Home from "./home/Home";

function App() {
  const [loggedIn, isLoggedIn] = useState(false);
  const pullLoggedInStatus = (data) => {
    isLoggedIn(data);
  };
  return (
    <div className="App">
      <Header isLoggedIn={pullLoggedInStatus} />
      <Home loggedIn={loggedIn}></Home>
      <Footer name="Shreerag"></Footer>
    </div>
  );
}

export default App;
