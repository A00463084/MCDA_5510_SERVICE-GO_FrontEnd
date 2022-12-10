import "./App.css";
import React, { useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Home from "./home/Home";

function App() {
  const [loggedIn, isLoggedIn] = useState(false);
  const [profile, setUserProfile] = useState(false);
  const pullLoggedInStatus = (data) => {
    isLoggedIn(data);
  };
  const userProfile = (val) => {
    setUserProfile(val);
  };
  return (
    <div className="App">
      <Header isLoggedIn={pullLoggedInStatus} showProfile={userProfile} />
      <Home loggedIn={loggedIn} showProfile={profile}></Home>
      <Footer name="Shreerag"></Footer>
    </div>
  );
}

export default App;
