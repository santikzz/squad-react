import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Lock, LockOpen, Menu, Clock, Users, Settings, LogOut, UserRound, Plus, Search, X, Bug, Info, Bell, Home, SquarePlus, FlaskConical, Ghost } from "lucide-react";

import GroupCard from "@/components/GroupCard";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import { FormatTimeAgo } from "@/components/services/Utils";

import "../App.css";
import assets from "@/Assets";
import { useGlobalContext } from "@/context/GlobalProvider";

const HomePage = () => {

  const [environment, setEnvironment] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSerachQuery] = useState("");
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [groupsLoading, setGroupsLoading] = useState(true);

  const timeoutRef = useRef(null);
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useGlobalContext();

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
    setLoading(false);
  }

  const fetchGroups = async () => {
    setGroupsLoading(true);
    setGroups([]);
    const { data, error } = await api.fetchGroups(showSearch, searchQuery, page);
    if (data) {
      setGroups(data);
    }
    setGroupsLoading(false);
  }

  useEffect(() => {
    fetchEnvironment();
    // fetchGroups();
  }, [])

  useEffect(() => {

    // 600ms debounce
    if (searchQuery) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(fetchGroups, 600);
    } else {
      fetchGroups();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, showSearch, page]);

  // focus search query
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleLogout = async () => {
    const response = await api.logout();
    if (response) {
      setIsLoggedIn(false);
      api.setAuthToken(null);
      localStorage.clear("token");
      navigate("/login");
    }
  };

  if (!isLoggedIn) return (<Navigate to="/login" />);
  if (loading) return (<Loader />);

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
            <div className="flex flex-row items-center w-96 px-3 py-2 rounded-xl bg-stone-800">
              <Search />
              <input className="ml-2 bg-transparent text-white outline-none font-satoshi-medium" ref={searchInputRef} value={searchQuery} onChange={(e) => setSerachQuery(e.target.value)} />
            </div>
            <X size="32" onClick={() => setShowSearch(false)} />
          </div>
        )}
      </Navbar>

      <Sheet open={sidenavOpen} onOpenChange={setSidenavOpen}>
        <SheetContent side="left" className="flex flex-col justify-between bg-black border-stone-900 text-white">
          <SheetHeader>
            <div className="flex flex-row gap-3 items-center my-12 items-center">
              <Avatar className="h-14 w-14">
                <AvatarImage src={api.API_URL + environment.user.avatar} />
                <AvatarFallback className="bg-gray-200">{environment.user.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <Label className="text-white text-xl text-wrap font-satoshi-medium">
                  {environment.user.name} {environment.user.surname}
                </Label>
                <Label className="text-gray-500 text-xs font-satoshi-medium">
                  {environment.user.facultad} - {environment.user.carrera}
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <Link to={"/user/" + environment.user.ulid} className="flex flex-row justify-start items-center">
                <UserRound className="w-6 mr-2" color="#d1d5db" />
                <Label className="font-satoshi-medium text-xl text-gray-300">Perfil</Label>
              </Link>
              <Link to="/settings" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                <Settings className="w-6 mr-2" color="#d1d5db" />
                <Label className="font-satoshi-medium text-xl text-gray-300">Opciones</Label>
              </Link>
              <Link to="/notifications" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                <Bell className="w-6 mr-2" color="#d1d5db" />
                <Label className="font-satoshi-medium text-xl text-gray-300">Notificaciones</Label>
              </Link>
              <button className="flex flex-row font-satoshi-medium text-xl bg-gradient rounded-md py-2 items-center justify-center active:brightness-75" onClick={() => navigate(`/create`)}>
                <Plus className="w-6 mr-2" color="#d1d5db" />
                <Label className="font-satoshi-medium text-xl text-gray-300">Nuevo grupo</Label>
              </button>
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-6">
            <Link to="/betainfo" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
              <FlaskConical className="w-6 mr-2" color="#d1d5db" />
              <Label className="font-satoshi-medium text-xl text-gray-300">BETA INFO</Label>
            </Link>
            <Link to="/about" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
              <Info className="w-6 mr-2" color="#d1d5db" />
              <Label className="font-satoshi-medium text-xl text-gray-300">Más Info</Label>
            </Link>
            <Link to="/report" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
              <Bug className="w-6 mr-2" color="#d1d5db" />
              <Label className="font-satoshi-medium text-xl text-gray-300">Bugs & Sugerencias</Label>
            </Link>
            <button className="flex flex-row font-satoshi-medium justify-start items-center text-xl" onClick={() => handleLogout()}>
              <LogOut className="w-6 mr-2" color="#d1d5db" />
              <Label className="font-satoshi-medium text-xl text-gray-300">Cerrar sesion</Label>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {groupsLoading ? <Loader /> : null}

      {!groupsLoading && groups.length === 0 ? (
        <div className="absolute inset-y-2/4 w-full flex items-center bg-white">
          <div className="w-full flex flex-col items-center text-gray-300 px-8 gap-2">
            <Ghost size="48" />
            <Label className="text-2xl text-center font-satoshi-bold text-2xl">No hay grupos, crea uno nuevo</Label>
          </div>
        </div>
      ) : null}

      <div className="h-[200vh] lg:h-full flex flex-col p-3 gap-3 lg:grid lg:grid-cols-3 bg-white">
        {groups.map((group, idx) => (
          <GroupCard group={group} key={group.ulid} />
        ))}
      </div>

      <BottomNav environment={environment}></BottomNav>

    </>
  );
};

export default HomePage;
