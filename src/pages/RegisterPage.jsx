import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register as apiRegister } from "../services/api";

import logo from "../assets/logo.png";
import bgTop from "../assets/bg_top.jpg";
import bgBot from "../assets/bg_bot.jpg";

import "../styles/login.scss";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await apiRegister(registerFormData);
    
    if (response.status === 200) {
      alert("debug: user registered successfully!");
      navigate("/login");
    } else {
      alert("debug: user registration failed. ("+response.error.code+")");
    }

    console.log(response);

  };

  // update register form data values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  return (
    <>
      {/* perma-temporal ? */}
      <img className="bg bg-top" src={bgTop}></img>
      <img className="bg bg-bot" src={bgBot}></img>
      <div className="bg black"></div>

      <div className="registerForm">
        <div className="logo">
          <img src={logo} alt="SQUAD" />
        </div>

        <div className="header">
          <h2 className="welcome">Vamos a crear tu cuenta</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-row">
            <label>Correo electronico</label>
            <input className="input-control" type="email" name="email" value={registerFormData.email} onChange={handleInputChange} />
          </div>

          <div className="input-row">
            <label>Nombre</label>
            <input className="input-control" type="text" name="name" value={registerFormData.name} onChange={handleInputChange} placeholder="" />
          </div>

          <div className="input-row">
            <label>Apellido</label>
            <input className="input-control" type="text" name="surname" value={registerFormData.surname} onChange={handleInputChange} placeholder="" />
          </div>

          <div className="input-row">
            <label>Contraseña</label>
            <input className="input-control" type="password" name="password" value={registerFormData.password} onChange={handleInputChange} placeholder="" />
          </div>

          <div className="input-row">
            <label>Repite la contraseña</label>
            <input className="input-control" type="password" name="password_confirmation" value={registerFormData.password_confirmation} onChange={handleInputChange} />
          </div>

          <button className="btn login-btn" type="submit">
            Registrarse <i className="fa-solid fa-chevron-right"></i>
          </button>

          <label className="already">
            ¿Ya tienes una cuenta?{" "}
            <Link className="link" to="/login">
              Inicia sesion
            </Link>
          </label>
        </form>

        <footer className="footer">
          <label className="copyright">SQUAD / BETA Release v1.24.3.1.0</label>
        </footer>
      </div>
    </>
  );
};

export default Register;
