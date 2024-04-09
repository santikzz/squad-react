import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { fetchFacultades, createGroup } from "../services/api";

import ProtectedRoute from "../services/ProtectedRoute";
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import Backdrop from "../components/Backdrop";
import Loader from "../components/Loader";

import logo from "../assets/logo.png";
import "../styles/forms.scss";
import "../styles/createGroup.scss";

const CreateGroup = () => {
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    privacy: "open",
    maxMembers: 0,
    idCarrera: 0,
    tags: ["none"], // temporarely voided
  });

  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);

  // const [selectedFacultad, setSelectedFacultad] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();

    const getFacultades = async () => {
      try {
        const response = await fetchFacultades(controller);
        setFacultades(response);
        setCarreras(response[0]["carreras"]);

        setLoading(false);

      } catch (error) {
        // console.log(error);
      }
    };

    getFacultades();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroupData((prevData) => ({ ...prevData, [name]: value }));
  };

  /*
   this is more straigthforwrad but can lead to race condition issues if one or more triggers 
    access the setGroupData at the same time, so we use the one on the top. here doesn't matter but whatever bruh
  */
  // const handleChange1 = (event) => {
  //   const { name, value } = event.target;
  //   setGroupData({ ...groupData, [name]: value });
  //   console.log(groupData);
  // };

  // not used temporarely until full tags are implemented :P
  const handleTagChange = (newTags) => {
    setGroupData((prevData) => ({
      ...prevData,
      tags: newTags,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createGroup(groupData);

    // console.log(response);

    if (!response.hasOwnProperty('error')) {
      alert("debug: group created successfully!");
      navigate("/groups/"+response.ulid);
    } else {
      alert("debug: group creation failed. (" + response.error.code + ")");
    }

  };

  const handleSelectFacultad = (event) => {
    const facultadKey = event.target.value; // key index in the api response obj
    // const selected = facultades[facultadKey]
    // setSelectedFacultad(selected);
    setCarreras(facultades[facultadKey].carreras);
  };

  return (
    <>
      <ProtectedRoute />
      <Navbar>
        <div className="icon-btn void"></div>
        <div className="navbar-logo">
          <img src={logo} alt="SQUAD" />
        </div>
        <Link to="/" className="icon-btn">
          <i className="fa-solid fa-xmark"></i>
        </Link>
      </Navbar>

      {loading ? <Loader /> : ""}

      {facultades ? (
        <div className="container">
          <div className="header">
            <h2>
              <i className="fa-solid fa-user-group"></i> Crear nuevo grupo
            </h2>
          </div>

          <form className="newGroupForm" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-title">
                <i className="fa-solid fa-quote-left"></i> Titulo
              </label>
              <input type="text" name="title" value={groupData.title} onChange={handleChange} className="input-control" required></input>
            </div>

            <div className="input-group">
              <label className="input-title">
                <i className="fa-solid fa-building-columns"></i> Facultad
              </label>
              <select className="input-control" onChange={handleSelectFacultad}>
                {facultades.map((value, key) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-title">
                <i className="fa-solid fa-graduation-cap"></i> Carrera
              </label>
              <select name="idCarrera" value={groupData.idCarrera} onChange={handleChange} className="input-control">
                {carreras.map((value) => (
                  <option key={value.id} value={value.id}>{value.name}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-title">
                <i className="fa-solid fa-quote-left"></i> Descripcion
              </label>
              <textarea name="description" value={groupData.description} onChange={handleChange} className="input-control textarea" required></textarea>
            </div>

            <label className="input-title">
              <i className="fa-solid fa-tag"></i> Tags
            </label>

            {/* removed temporarely */}
            {/* <div className="tagSelection">
            <Tag value="cursada" tags={groupData.tags} setTags={handleTagChange}>Cursada</Tag>
            <Tag value="parcial" tags={groupData.tags} setTags={handleTagChange}>Parcial</Tag>
            <Tag value="final" tags={groupData.tags} setTags={handleTagChange}>Final</Tag>
            <Tag value="online" tags={groupData.tags} setTags={handleTagChange}>Online</Tag>
            <Tag value="presencial" tags={groupData.tags} setTags={handleTagChange}>Presencial</Tag>
            <Tag value="hibrido" tags={groupData.tags} setTags={handleTagChange}>Hibrido</Tag>
          </div> */}

            <div className="input-group">
              <label className="input-title">
                <i className="fa-solid fa-eye"></i> Privacidad
              </label>
              <select name="privacy" value={groupData.privacy} onChange={handleChange} className="input-control">
                <option value="open">Abierto</option>
                <option value="closed">Cerrado</option>
                <option value="private">Privado</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-title">
                <i className="fa-solid fa-user"></i> Limite de miembros
              </label>
              <input type="number" name="maxMembers" value={groupData.maxMembers} onChange={handleChange} className="input-control"></input>
            </div>

            <button className="btn" type="submit">
              <i className="fa-regular fa-plus"></i> Crear nuevo grupo
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default CreateGroup;
