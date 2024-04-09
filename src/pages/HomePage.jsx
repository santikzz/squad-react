import React, { useState, useContext, useEffect, useRef } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Link } from "react-router-dom";

// import { fetchGroups } from "../services/api.jsx";

// import ProtectedRoute from "../services/ProtectedRoute.jsx";
// import Navbar from "../components/Navbar.jsx";
// import Tag from "../components/Tag.jsx";
// import Sidenav from "../components/Sidenav.jsx";
// import GroupCard from "../components/GroupCard";

import Navbar from "@/components/Navbar";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

import { Lock, LockOpen, Menu, Clock, Users, X, Settings, LogOut } from "lucide-react";

// import Backdrop from "../components/Backdrop.jsx";
// import Loader from "../components/Loader.jsx";

// import logo from "../assets/logo.png";
// import placeholderProfileImg from "../assets/ppl.jpg";
// import "../styles/home.scss";
// import "../styles/search.scss";
// import { compile } from "sass";

import "../App.css";

import { Button } from "@/components/ui/button";

const Home = () => {
  const [sidenavOpen, setSidenavOpen] = useState(false); // toggle sidenav
  const [searchQuery, setSerachQuery] = useState(""); // update the search query
  const [showSearch, setSearchNav] = useState(false); // toggle search navbar
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  // const timeoutRef = useRef(null);
  // const searchInputRef = useRef();

  // const [groups, setGroups] = useState([]); // fetch groups for the feed
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const tags = ["cursada", "parcial", "final", "online", "presencial", "hibrido", "otro"];

  // useEffect(() => {
  //   let controller = new AbortController();
  //   setGroups([]);
  //   setLoading(true);

  //   const getGroups = async () => {
  //     try {
  //       setSerachQuery(showSearch ? searchQuery : ""); // only search if search is open
  //       const groupsData = await fetchGroups(searchQuery, selectedTags, page, controller);
  //       setGroups(groupsData.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("Error fetching groups:", error.message);
  //     }
  //   };

  //   // if search query, debounce 600ms to avoid api abuse
  //   if (searchQuery) {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //     timeoutRef.current = setTimeout(getGroups, 600);
  //   } else {
  //     getGroups();
  //   }

  //   return () => {
  //     controller.abort();
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, [searchQuery, showSearch, page, selectedTags]);

  // useEffect(() => {
  //   if (showSearch) {
  //     searchInputRef.current.focus(); // focus on search input on show
  //   }

  // }, [showSearch]);

  // // ==== load user data ==== //
  // // useEffect(() => {
  // //   setUser(JSON.parse(localStorage.getItem("userdata")));
  // // }, []);

  // const handleTagClick = (value) => {
  //   if (selectedTags.includes(value)) {
  //     setSelectedTags(selectedTags.filter((tag) => tag !== value));
  //   } else {
  //     setSelectedTags([...selectedTags, value]);
  //   };
  // };

  // ==== lazy load feed ==== //
  // const handleScroll = () => {
  //   if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
  //     setPage(prev => prev + 1);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Navbar>
        <button className="bg-transparent" onClick={(e) => setSidenavOpen(!sidenavOpen)}><Menu></Menu></button>
        <img src="squad-logo-white.png" className="h-full"></img>
        <Menu color="transparent"></Menu>
      </Navbar>

      <div className={`sidenav ${sidenavOpen ? "sidenav-open" : null}`}>
        <div className="flex flex-row justify-end w-full pt-6 pr-3">
          <Button className="bg-transparent" onClick={(e) => setSidenavOpen(!sidenavOpen)}>
            <X size="32" strokeWidth="3"/>
          </Button>
        </div>

        <div className="flex flex-col justify-between py-4 px-4 h-full">
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-4 items-center mb-4">
              <Avatar>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <label className="text-white text-medium text-lg">username</label>
            </div>
            <Button className="justify-start text-xl bg-transparent m-0 p-0 ">
              <Settings className="w-6 mr-2" />
              Options
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <Button className="justify-start text-xl bg-transparent m-0 p-0">
              <LogOut className="w-6 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col p-4 gap-4">
        {[...Array(10)].map((e, i) => (
          <Card key={i} className="w-full shadow-md bg-stone-50">
            <CardHeader className="flex flex-row gap-2">
              <Avatar>
                <AvatarImage src="" alt="profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col mt-0">
                <Label className="text-sm">Santiago Nicolas del Corazon</Label>
                <Label className="text-stone-400 text-xs font-normal">EXACTAS / Ing. Sistemas</Label>
              </div>
            </CardHeader>
            <CardContent>lore ipsum dolor amet lore ipsum dolor amet lore ipsum dolor amet lore ipsum dolor amet lore ipsum dolor amet lore ipsum dolor amet </CardContent>
            <CardFooter className="flex flex-row justify-between gap-2">
              <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm">
                <Lock size="18" strokeWidth="2" color="white"></Lock>
                <Label className="text-normal font-medium">Grupo cerrado</Label>
              </div>
              <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm">
                <Users size="18" strokeWidth="2" color="white"></Users>
                <Label className="text-normal font-medium">3/4</Label>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
