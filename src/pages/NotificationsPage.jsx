import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Square, ChevronLeft, Clock, Check, X, BellOff } from "lucide-react";

import { FormatTimeAgo } from "@/components/services/Utils";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import assets from "@/Assets";

const NotificationsPage = () => {

  const [environment, setEnvironment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const { isLoggedIn } = useGlobalContext();

  const navigate = useNavigate();

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
    setLoading(false);
  }

  const fetchRequests = async () => {
    const { data, error } = await api.fetchGroupRequests();
    if (data) {
      setJoinRequests(data);
    }
  };

  const fetchNotifications = async () => {
    const { data, error } = await api.fetchNotifications();
    if (data) {
      setNotifications(data.notifications);
    }
  };

  useEffect(() => {
    fetchEnvironment();
    fetchRequests();
    fetchNotifications();
  }, []);

  const handleJoinRequest = async (requestId, accept) => {
    const response = api.handleJoinRequest(requestId, accept);
    if (response) {
      setJoinRequests((prev) => prev.filter(item => item.requestId !== requestId));
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    const data = await api.handleDeleteNotification(notificationId);
    if (data) {
      setNotifications((prev) => prev.filter(item => item.id !== notificationId));
    }
  }

  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
      </Navbar>

      {(!environment || !joinRequests || !notifications) ? (<Loader />) : (
        <>
          {joinRequests.length === 0 && notifications.length === 0 ? (
            <div className="absolute inset-y-2/4 w-full flex items-center">
              <div className="flex flex-col items-center text-gray-300 px-8 gap-2">
                <BellOff size="48" />
                <Label className="text-2xl text-center font-satoshi-bold">No tienes notificaciones ni solicitudes nuevas</Label>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col pt-8 p-4 gap-4 justify-start lg:items-center">
            {joinRequests.map((request, idx) => (
              <Card className="flex flex-col shadow lg:w-100" key={request.requestId}>

                <div className="flex flex-row p-3 gap-3 justify-start items-center">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={api.API_URL + request.user.avatar} alt="profile" />
                    <AvatarFallback className="bg-stone-200">{request.user.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Label className="text-base font-satoshi-medium">
                      <span className="font-satoshi-bold">{request.user.name} {request.user.surname}
                      </span> ha solicitado unirse a tu grupo <span className="font-satoshi-bold">'{request.group.title}'</span>
                    </Label>
                  </div>
                </div>
                <div className="w-full h-[0.5px] bg-gray-300"></div>
                <div className="flex flex-row justify-between">
                  <button className="w-full py-4 flex justify-center py-2 text-red-400 active:bg-gray-200 rounded-md transition-all duration-300 ease-out" onClick={(e) => handleJoinRequest(request.requestId, false)}>
                    <X size="26" strokeWidth={3} />
                  </button>
                  <div className="bg-gray-300 w-[2px] "></div>
                  <button className="w-full py-4 flex justify-center py-2 text-green-400 active:bg-gray-200 rounded-md transition-all duration-300 ease-out" onClick={(e) => handleJoinRequest(request.requestId, true)}>
                    <Check size="26" strokeWidth={3} />
                  </button>
                </div>
              </Card>
            ))}

            {notifications.map((notif, idx) => (
              <Card className="flex p-3 gap-3 shadow-md lg:w-100" key={notif.id}>
                <div className="flex flex-row gap-4 justify-start items-center">
                  <div className="flex flex-col gap-1.5">
                    <Label className="flex gap-1 items-center text-gray-400 text-sm font-satoshi-medium">
                      <Clock size="12" />
                      {FormatTimeAgo(notif.createdDate)}
                    </Label>
                    <Label className="font-satoshi-medium text-base">{notif.content}</Label>
                  </div>
                  <button className="text-gray-400 p-3" onClick={() => handleDeleteNotification(notif.id)}><X /></button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
      <BottomNav environment={environment}></BottomNav>
    </>
  );
};

export default NotificationsPage;
