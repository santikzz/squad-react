import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api from "@/components/services/Api";
import { UsernameAvatarFallout, FormatTimeAgo } from "@/components/services/Utils";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Square, ChevronLeft, Plus, Users, Quote } from "lucide-react";

import assets from "@/Assets";
// import squadLogo from "/squad-logo-white.png";

const ProfilePage = ({ currentuser }) => {
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOwn, setIsOwn] = useState(false);

  useEffect(() => {

    setIsOwn(currentuser.ulid == userId);

    const fetchProfle = async () => {
      try {
        const response = await api.get(`/user/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfle();
  }, []);

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <img src={assets.logo1_white} className="h-full"></img>
        <Square color="transparent" />
      </Navbar>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col pt-8 p-4 gap-6 justify-start">
          <Card className="flex justify-start bg-stone-50 p-4 gap-4 shadow-md">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt="profile" />
              <AvatarFallback className="text-stone-900">{UsernameAvatarFallout(currentuser.name, currentuser.surname)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <Label className="text-base text-black">
                {user.name} {user.surname}
              </Label>
              <Label className="text-stone-700 text-sm font-normal">{user.email}</Label>
              <Label className="text-stone-700 text-sm font-normal">
                {user.facultad} / {user.carrera}
              </Label>
            </div>
          </Card>

          <div className="flex flex-col">
            <Label className="font-medium text-base mb-2 flex gap-1.5 items-center">
              <Quote size="16" />
              Sobre mi
            </Label>
            <Card className="flex flex-col bg-stone-50 p-4 shadow-md">
              <Label className="font-normal text-base">{user.about}</Label>
            </Card>
          </div>

          {/* <div className="flex flex-col">
            <Label className="font-medium text-base mb-2 flex gap-1.5 items-center">
              <Users size="16" />
              Mis grupos
            </Label>
            <Card className="w-full bg-stone-50 active:brightness-95 shadow-md">
              <CardHeader className="flex flex-row gap-2">
                <Avatar>
                  <AvatarImage src="" alt="profile" />
                  <AvatarFallback>aa</AvatarFallback>
                </Avatar>
                <div className="flex flex-col mt-0">
                  <Label className="text-sm">sadasd asdasdsa</Label>
                  <Label className="text-stone-400 text-xs font-normal">asdsad sadasdasd</Label>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 ">
                <Label className="text-base">65354654646</Label>
                <p className="text-sm">asdasdasdas</p>
              </CardContent>
              <CardFooter className="flex flex-row justify-between gap-2">
                <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm min-w-32 justify-center">
                  <LockOpen size="18" strokeWidth="2" color="white"></LockOpen>
                  <Label className="text-normal font-medium">Grupo abierto</Label>
                </div>
                <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm min-w-16 justify-center">
                  <Users size="18" strokeWidth="2" color="white"></Users>
                  <Label className="text-normal font-medium">3 / 4</Label>
                </div>
              </CardFooter>
            </Card>
          </div> */}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
