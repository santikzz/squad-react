import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// import AuthGuard from "../services/ProtectedRoute";
// import axiosApi from "../api/AxiosApi";
// import { fetchGroup, groupRequestAction } from "../services/api.jsx";

// import ProtectedRoute from "../services/ProtectedRoute.jsx";
// import Navbar from "../components/Navbar";
// import Backdrop from "../components/Backdrop";
// import Loader from "../components/Loader";
// import Sidenav from "../components/Sidenav.jsx";

// import { timeAgo } from "../utils/timeUtils";
// import { capFirst } from "../utils/stringUtils";

// import logo from "../assets/logo.png";
// import placeholderProfileImg from "../assets/ppl.jpg";

// import "../styles/group.scss";

import Navbar from "@/components/Navbar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { Square, Lock, LockOpen, ChevronLeft, Users, Forward } from "lucide-react";
import { Button } from "@/components/ui/button";

const Group = () => {
  // const { darkMode, toggle } = useContext(DarkModeContext);
  // const { currentUser } = useContext(AuthContext);
  const { ulid } = useParams();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [showSidenav, setSidenav] = useState(false);

  // useEffect(() => {
  //   let controller = new AbortController();

  //   setLoading(true);

  //   const getGroup = async () => {
  //     try {
  //       const response = await fetchGroup(ulid, controller);
  //       setGroup(response);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("Error fetching group:", error.message);
  //     }
  //   };

  //   getGroup();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [refresh]);

  // const handleGroupAction = async (e) => {
  //   e.preventDefault();
  //   let controller = new AbortController();

  //   let action = group.user.hasJoinRequest ? "cancel" : "join";
  //   action = group.user.isMember ? "leave" : action;

  //   try {
  //     const response = await groupRequestAction(ulid, action, controller);
  //     setRefresh(!refresh);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error.message);
  //   }

  //   setSidenav(false);
  // };

  // useEffect(() => {
  //   fetchGroup();
  // }, [refresh]);

  return (
    <>
      {/* <ProtectedRoute /> */}
      <Navbar>
        <ChevronLeft size="32"></ChevronLeft>
        <img src="squad-logo-white.png" className="h-full"></img>
        <Square size="32" color="transparent"></Square>
      </Navbar>

      <div className="bg-black h-40 flex flex-col px-4 py-6 gap-4 shadow-lg">
        <div className="flex flex-row gap-2">
          <Avatar>
            <AvatarImage src="" alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col mt-0">
            <Label className="text-sm text-white">Santiago Nicolas del Corazon</Label>
            <Label className="text-stone-400 text-xs font-normal">EXACTAS / Ing. Sistemas</Label>
          </div>
        </div>

        <div className="flex h-full items-center">
          <Label className="text-white text-lg">this is a group title very very long title and interesting!</Label>
        </div>
      </div>

      <div className="flex flex-col pt-4 px-4 gap-4 mb-4">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center bg-gradient rounded-lg py-2 px-3 text-stone-100 gap-1.5 shadow-sm">
            <Lock size="20" strokeWidth="2" color="white"></Lock><Label className="text-normal font-medium">Grupo cerrado</Label>
          </div>
          <div className="flex flex-row items-center bg-gradient rounded-lg py-2 px-3 text-stone-100 gap-1.5 shadow-sm">
            <Users size="20" strokeWidth="2" color="white"></Users><Label className="text-normal font-medium">3/4</Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Descripcion</Label>
          <Card className="min-h-24 flex p-4 bg-stone-50 shadow-sm">lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet </Card>
        </div>

        <div className="flex flex-col">
          <Button className="bg-gradient min-h-12 text-white font-medium shadow-sm">
            <Forward /> Unirse
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Miembros</Label>

          {[...Array(4)].map((e, i) => (
            <Card key={i} className="flex bg-stone-50 p-4 shadow-sm">
              <div className="flex flex-row gap-2">
                <Avatar>
                  <AvatarImage src="" alt="profile" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col mt-0">
                  <Label className="text-sm text-stone-900">Santiago Nicolas del Corazon</Label>
                  <Label className="text-stone-400 text-xs font-light">EXACTAS / Ing. Sistemas</Label>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Group;
