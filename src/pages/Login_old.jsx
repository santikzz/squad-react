import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// import API_URL from "../Config";
// import axiosApi from "../api/AxiosApi";

import { login as apiLogin } from "../services/api";
import { setToken } from "../services/auth";

import logo from "../assets/logo.png";
import bgTop from "../assets/bg_top.jpg";
import bgBot from "../assets/bg_bot.jpg";

import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import "../styles/login.scss";

const Login = () => {

  const [loginFormData, setLoginFormData] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState();
  const navigate = useNavigate();

  const toggleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await apiLogin(loginFormData);
    if (response.token) {
      setToken(response.token, rememberMe);
      navigate("/");
    } else {
      // console.log(response.error);

      switch (response.error.code) {
        case "user_not_registred":
          setError("Email no registrado.");
          break;

        case "invalid_password":
          setError("Contraseña incorrecta.");
          break;
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  return (
    <>
      {/* perma-temporal ? */}
      <img className="bg bg-top" src={bgTop}></img>
      <img className="bg bg-bot" src={bgBot}></img>
      <div className="bg black"></div>

      <div className="loginForm">
        <div className="logo">
          <img src={logo} alt="SQUAD" />
        </div>

        <div className="header">
          <h2 className="welcome">¡Bienvenido de vuelta!</h2>
          <label className="register">
            ¿Aun no tienes cuenta?
            <Link className="link" to="/register">
              Registrate
            </Link>
          </label>
        </div>

        <form className="form" onSubmit={handleLogin}>
          <input className="form-input-control" type="text" name="email"  value={loginFormData.email} onChange={handleInputChange} placeholder="Email" />
          <input className="form-input-control" type="password" name="password" value={loginFormData.password} onChange={handleInputChange}  placeholder="Contraseña" />

          {/* <input className="form-input-control" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="form-input-control" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" /> */}

          <div className="form-options">
            <div className="checkbox-group">
              <input className="rememberme" type="checkbox" name="rememberme" checked={rememberMe} onChange={toggleRememberMe} />
              <label className="checkbox-label">Recuerdame</label>
            </div>
            <Link className="forgot" to="/recover">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error ? <label className="errorMessage">{error}</label> : null}

          <button className="btn login-btn" type="submit">
            Iniciar sesion <i className="fa-solid fa-right-to-bracket"></i>
          </button>

          <div className="third-login">
            <div className="legend">
              <div className="divider"></div>
              <label className="divider-text">o continuar con</label>
              <div className="divider"></div>
            </div>

            <div className="logos">
              <img src={google} alt="google" />
              <img src={facebook} alt="facebook" />
            </div>
          </div>
        </form>

        <footer className="footer">
          <label className="copyright">SQUAD / BETA Release v1.24.3.1.0</label>
        </footer>
      </div>
    </>
  );
};

export default Login;
