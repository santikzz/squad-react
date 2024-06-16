import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/components/services/Api";
import { UsernameAvatarFallout, FormatTimeAgo } from "@/components/services/Utils";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Lock, LockOpen, Menu, Clock, Users, Settings, LogOut, UserRound, Plus, Search, X, Bug, Info, Bell, Home, SquarePlus } from "lucide-react";

import "../App.css";
import assets from "@/Assets";
// import assets.logo1_white from "static/squad-logo-white.png";

import { Button } from "@/components/ui/button";

const HomePage = ({ currentuser }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSerachQuery] = useState("");
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  const timeoutRef = useRef(null);
  const searchInputRef = useRef();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // const tags = ["cursada", "parcial", "final", "online", "presencial", "hibrido", "otro"];´

  useEffect(() => {
    // let controller = new AbortController();
    setGroups([]);
    setLoading(true);

    const fetchGroups = async () => {
      try {
        const searchQ = showSearch && searchQuery != "" ? "&search=" + searchQuery : "";
        const pageN = page > 1 ? "&page=" + page : "";

        const response = await api.get(`/groups?${searchQ}${pageN}`);
        if (response.status === 200) {
          setGroups(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching groups:", error.message);
      }
    };

    // if search query, debounce 600ms to avoid api abuse
    if (searchQuery) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(fetchGroups, 600);
    } else {
      fetchGroups();
    }

    return () => {
      // controller.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, showSearch, page]);

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

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

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  const handleCreateGroup = () => {
    navigate(`/create`);
  };

  const handleLogout = async () => {
    try {
      const response = await api.get("/logout");
      if (response.status === 200) {
        // setRefresh(!refresh);
        localStorage.clear("token");
        sessionStorage.clear("token");
        // navigate("/login");
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar>
        {!showSearch ? (
          <>
            <Menu size="32" strokeWidth="2" onClick={() => setSidenavOpen(true)} />
            <img src={assets.logo1_white} className="h-full" />
            <Search className="active:brightness-50" size="32" strokeWidth="2" onClick={() => setShowSearch(true)} />
          </>
        ) : (
          <div className="flex flex-row w-full items-center justify-between gap-3">
            <div className="flex flex-row items-center w-96 px-3 py-2 rounded-full bg-stone-800">
              <Search />
              <input className="ml-2 bg-transparent text-white outline-none" ref={searchInputRef} value={searchQuery} onChange={(e) => setSerachQuery(e.target.value)} />
            </div>
            <X size="32" onClick={() => setShowSearch(false)} />
          </div>
        )}
      </Navbar>

      <Sheet open={sidenavOpen} onOpenChange={setSidenavOpen}>
        <SheetContent side="left" className="flex flex-col justify-between bg-black border-stone-900 text-white">
          <SheetHeader className="mt-12">
            <div className="flex flex-row gap-4 items-center mb-12">
              <Avatar>
                <AvatarImage src={currentuser.profileImg} />
                <AvatarFallback className="text-stone-900">{UsernameAvatarFallout(currentuser.name, currentuser.surname)}</AvatarFallback>
              </Avatar>
              <label className="text-white text-medium text-base text-wrap">
                {currentuser.name} {currentuser.surname}
              </label>
            </div>

            <div className="flex flex-col gap-8">
              <Link to={"/user/" + currentuser.ulid} className="flex flex-row justify-start items-center text-xl outline-none bg-transparent active:text-stone-500">
                <UserRound className="w-6 mr-2" />
                Pefil
              </Link>
              <Link to="/settings" className="flex flex-row justify-start items-center text-xl outline-none bg-transparent active:text-stone-500">
                <Settings className="w-6 mr-2" />
                Opciones
              </Link>
              <Link to="/notifications" className="flex flex-row justify-start items-center text-xl outline-none bg-transparent active:text-stone-500">
                <Bell className="w-6 mr-2" />
                Notificaciones
              </Link>
              <button className="flex flex-row text-xl bg-gradient rounded-md py-2 items-center justify-center active:brightness-75" onClick={handleCreateGroup}>
                <Plus className="w-6 mr-2" />
                Nuevo grupo
              </button>
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-8">
            <Link to="/about" className="flex flex-row justify-start items-center text-xl outline-none bg-transparent active:text-stone-500">
              <Info className="w-6 mr-2" />
              Más Info
            </Link>
            <Link to="/report" className="flex flex-row justify-start items-center text-xl outline-none bg-transparent active:text-stone-500">
              <Bug className="w-6 mr-2" />
              Bugs & Sugerencias
            </Link>
            <button className="flex flex-row justify-start items-center text-xl outline-none bg-transparent active:text-stone-500" onClick={handleLogout}>
              <LogOut className="w-6 mr-2" />
              Cerrar sesion
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {loading ? <Loader /> : null}

      <div className="h-screen flex flex-col p-4 gap-5 lg:grid lg:grid-cols-3 bg-slate-50">
        {groups.map((group, idx) => (

          <Card key={group.ulid} onClick={(e) => handleGroupClick(group.ulid)} className="w-full shadow bg-white active:brightness-95 flex flex-col p-6 gap-4 rounded-xl">

            <div className="flex flex-row items-center gap-2 h-full">
              <Avatar className="w-12 h-12">
                <AvatarImage src={group.owner.profileImg} alt="profile" />
                <AvatarFallback className="bg-stone-200">{UsernameAvatarFallout(group.owner.name, group.owner.surname)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label className="text-sm">
                  {group.owner.name} {group.owner.surname}
                </Label>
                <Label className="text-stone-400 text-xs font-normal">
                  {group.facultad} - {group.carrera}
                </Label>
                <Label className="flex gap-1 items-center text-stone-400 text-xs font-normal">
                  <Clock size="12" />
                  {FormatTimeAgo(group.creationDate)}
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-base">{group.title}</Label>
              <p className="text-base">{group.description}</p>
            </div>

            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm min-w-32 justify-center">
                {group.privacy == "open" ? <LockOpen size="18" strokeWidth="2" color="white"></LockOpen> : <Lock size="18" strokeWidth="2" color="white"></Lock>}
                <Label className="text-normal font-medium">Grupo {group.privacy == "open" ? "abierto" : "cerrado"}</Label>
              </div>
              <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm min-w-16 justify-center">
                <Users size="18" strokeWidth="2" color="white"></Users>
                <Label className="text-normal font-medium">
                  {group.membersCount}
                  {group.maxMembers != null ? `/` + group.maxMembers : ""}
                </Label>
              </div>
            </div>

          </Card>

        ))}
      </div>


      <div className="fixed bottom-0 left-0 w-full bg-white border-t-[1px] lg:hidden">

        <div className="w-full flex flex-row justify-between gap-4 py-4 px-8 items-center">

          <Link to="/" className="active:brightness-50">
            <Home size="20" strokeWidth="2" color="black"></Home>
          </Link>

          <Link to="/settings" className="active:brightness-50">
            <Settings size="20" strokeWidth="2" color="black"></Settings>
          </Link>

          <Link to="/create" className="active:brightness-50">
            <SquarePlus size="26" strokeWidth="2" color="black"></SquarePlus>
          </Link>

          <Link to="/notifications" className="active:brightness-50">
            <Bell size="20" strokeWidth="2" color="black"></Bell>
          </Link>

          <Link to={"/user/" + currentuser.ulid} className="active:brightness-50">
            <UserRound size="20" strokeWidth="2" color="black"></UserRound>
          </Link>

        </div>

      </div>


    </>
  );
};

export default HomePage;
