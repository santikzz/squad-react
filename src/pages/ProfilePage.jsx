import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { EllipsisVertical, ChevronLeft, Flag, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FormatTimeAgo } from "@/components/services/Utils";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import assets from "@/Assets";
import { useGlobalContext } from "@/context/GlobalProvider";

const ProfilePage = () => {

  const { userId } = useParams();
  const [environment, setEnvironment] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userOptions, setUserOptions] = useState(false);
  const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
    setLoading(false);
  }

  const fetchUserdata = async () => {
    const { data, error } = await api.fetchUserdata(userId);
    if (data) {
      setUserdata(data);
    }
  };

  useEffect(() => {
    fetchEnvironment();
    fetchUserdata();
  }, []);

  if (!environment) return (<Loader />);
  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <EllipsisVertical size="32" onClick={() => setUserOptions(true)} />
      </Navbar>

      <Sheet open={userOptions} onOpenChange={setUserOptions}>
        <SheetContent side="right" className="flex flex-col justify-between bg-black border-stone-900 text-white">
          <>
            <SheetHeader className="mt-32"></SheetHeader>
            <SheetFooter className="w-full">

              <Button className="w-full bg-transparent outline outline-2 outline-red-500 text-red-500 flex gap-1.5 font-satoshi-medium">
                <Flag size="16" />
                Reportar usuario
              </Button>
            </SheetFooter>
          </>
        </SheetContent>
      </Sheet>


      {!userdata ? (
        <Loader />
      ) : (

        <div className="flex flex-col pt-8 p-4 gap-6 justify-start">

          <div className="flex flex-col w-full items-center">

            <Avatar className="w-32 h-32 border-gray-600">
              <AvatarImage src={api.API_URL + userdata.avatar} alt="profile" />
              <AvatarFallback className="text-gray-900">{userdata.avatarFallback}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center mt-2 gap-1">
              <Label className="text-2xl text-black font-satoshi-bold">
                {userdata.name} {userdata.surname}
              </Label>

              {/* <Label className="text-gray-700 text-sm font-normal">{userdata.email}</Label> */}
              <Label className="text-gray-600 text-base font-satoshi-medium">
                {userdata.facultad} - {userdata.carrera}
              </Label>

              <Label className="font-satoshi-regular text-gray-600">Se unio {FormatTimeAgo(userdata.memberSince)}</Label>
            </div>

          </div>
          {userdata.about != "" ? (
            <div className="flex flex-col">
              <Label className="text-lg mb-2 flex gap-1.5 items-center font-satoshi-bold">
                <Quote size="16" />
                Sobre mi
              </Label>
              <Card className="flex flex-col p-4">
                <Label className="font-satoshi-medium text-base text-gray-600">{userdata.about}</Label>
              </Card>
            </div>
          ) : null}

        </div>
      )}
      <BottomNav environment={environment}></BottomNav>
    </>
  );
};

export default ProfilePage;
