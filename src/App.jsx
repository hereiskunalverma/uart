import UAuth from "@uauth/js";
import React, { useEffect, useState } from "react";
import Search from "./Search";

import "./css/Global.css";
import "./css/Nav.css";
import "./css/Login.css";

import logo from "./img/logo.png";
import background from "./img/video.mp4";

/*/////////////////////////////
 *   Unstoppable Authentication
 */ /////////////////////////////
const uauth = new UAuth({
  clientID: `${process.env.REACT_APP_CLIENT_ID}`,
  redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
  scope: "openid wallet",
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /*///////////////////////
   *   Login/out Functions
   */ //////////////////////
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  /*///////////////////////
   *   Display content
   */ //////////////////////

  if (loading) {
    return (
      <>
        <video autoPlay muted={true} loop className="video-bg">
          <source src={background} type="video/mp4" />
        </video>
      </>
    );
  }

  if (error) {
    console.error(error);
    return <App />;
  }

  if (user) {
    return (
      <>
        <div className="nav animate">
          <ul className="logo-wrapper">
            <li className="logo-item">
              <img className="logo" src={logo} alt="logo" />
            </li>
            <li className="logo-item">
              <h1 className="logo-title">UArt</h1>
            </li>
            <li className="logo-item">
              <span className="logo-title subtitle">| NFT Gallery</span>
            </li>
            <hr />
          </ul>

          <ul className="auth-wrapper">
            <li className="auth-item domain">{user.sub}</li>
            <li className="auth-item">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <Search />
      </>
    );
  }

  return (
    <>
      <video autoPlay muted={true} loop className="video-bg animate" id="vid">
        <source src={background} type="video/mp4" />
      </video>
      <div className="login-wrapper positioned animate">
        <div className="login">
          <div className="login-image">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-title" style={{ paddingBottom: "10rem" }}>
            <h1>UArt</h1>
            <h2>Art Gallery</h2>
            <h3>View NFT Collections by simply search their crypto address</h3>
          </div>
          <button
            className="login-btn positioned"
            onClick={handleLogin}
          ></button>
        </div>
      </div>
    </>
  );
};

export default App;
