import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api, { baseURL } from "@/components/services/Api";
import { UsernameAvatarFallout, FormatTimeAgo } from "@/components/services/Utils";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Square, ChevronLeft, Ghost, Clock, Check, X, BellOff } from "lucide-react";

import assets from "@/Assets";

const NotificationsPage = ({ currentuser }) => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [requests, setRequests] = useState([]);


  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const response = await api.get(`/user/requests`);
        if (response.status === 200) {
          setRequests(response.data);
          setLoading(false);
          console.log(requests);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
  }, []);



  const handleRequest = async (requestId, accept) => {

    // Route::get('user/requests/{requestId}/{action}', [GroupController::class, 'handleJoinRequest']);
    try {
      let action = accept ? 'accept' : 'decline';
      const response = await api.get(`/user/requests/${requestId}/${action}`);
      if (response.status == 200) {
        // console.log(response);
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }

  };

  // const handleLogout = async () => {
  //   try {
  //     const response = await api.get("/logout");
  //     if (response.status === 200) {
  //       // setRefresh(!refresh);
  //       localStorage.clear("token");
  //       sessionStorage.clear("token");
  //       // navigate("/login");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <img src={assets.logo1_white} className="h-full"></img>
        <Square color="transparent" />
      </Navbar>

      {loading ? <Loader /> : null}

      {!loading && requests.length === 0 ? (
        <div className="absolute inset-y-2/4 w-full flex items-center">

          <div className="flex flex-col items-center text-gray-300 px-8 gap-2">
            <BellOff size="48" />
            <Label className="text-2xl text-center font-medium">No tienes notificaciones ni solicitudes nuevas</Label>
          </div>

        </div>
      ) : null}


      <div className="flex flex-col pt-8 p-4 gap-6 justify-start">

        {requests.map((request, idx) => (

          <Card className="flex flex-col bg-stone-50 p-6 gap-4 shadow-md" key={request.requestId}>

            <div className="flex flex-row gap-4 justify-start items-center">

              <Avatar className="w-12 h-12">
                <AvatarImage src={baseURL + request.user.profileImg} alt="profile" />
                <AvatarFallback className="bg-stone-200">{UsernameAvatarFallout(request.user.name, request.user.surname)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-2">
                <Label className="flex gap-1 items-center text-stone-400 text-xs font-normal">
                  <Clock size="12" />
                  Hace (undefined)
                </Label>
                <Label className="font-normal"><span className="font-medium">{request.user.name} {request.user.surname}</span> ha solicitado unirse a tu grupo <span className="font-medium">{request.group.title}</span></Label>
              </div>

            </div>

            <div className="flex flex-row justify-between">

              <button className="w-full flex justify-center py-2 text-red-400 active:bg-gray-200 rounded-md transition-all duration-300 ease-out" onClick={(e) => handleRequest(request.requestId, false)}><X /></button>
              <div className="bg-gray-300 w-[2px] "></div>
              <button className="w-full flex justify-center py-2 text-green-400 active:bg-gray-200 rounded-md transition-all duration-300 ease-out" onClick={(e) => handleRequest(request.requestId, true)}><Check /></button>

            </div>

          </Card>

        ))}

      </div>

    </>
  );
};

export default NotificationsPage;
