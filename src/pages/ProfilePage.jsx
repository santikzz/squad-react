import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api, { baseURL } from "@/components/services/Api";
import { UsernameAvatarFallout, FormatTimeAgo } from "@/components/services/Utils";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { EllipsisVertical, ChevronLeft, Flag, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

import assets from "@/Assets";
// import squadLogo from "/squad-logo-white.png";

const ProfilePage = ({ currentuser }) => {
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOwn, setIsOwn] = useState(false);
  const [userOptions, setUserOptions] = useState(false);

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



  // {
  //   "ulid": "a14b36192df54d95151a58e8c39a0806",
  //   "name": "Verdie Barrows",
  //   "surname": "Lubowitz",
  //   "about": "Quo ipsa officia ea corrupti. Voluptatem molestiae reprehenderit ipsam consectetur nulla non id. Possimus voluptatem aliquid quia deserunt corrupti.",
  //   "facultad": "HUMANAS",
  //   "carrera": "carrera4",
  //   "email": "lula86@example.com",
  //   "memberSince": "10/04/2024",
  //   "profileImg": null
  // }

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <img src={assets.logo1_white} className="h-full"></img>
        <EllipsisVertical size="32" onClick={() => setUserOptions(true)} />
      </Navbar>


      <Sheet open={userOptions} onOpenChange={setUserOptions}>
        <SheetContent side="right" className="flex flex-col justify-between bg-black border-stone-900 text-white">
          <>
            <SheetHeader className="mt-32"></SheetHeader>
            <SheetFooter className="w-full">

              <Button className="w-full bg-transparent outline outline-2 outline-red-500 text-red-500 flex gap-1.5">
                <Flag size="16" />
                Reportar usuario
              </Button>
            </SheetFooter>
          </>
        </SheetContent>
      </Sheet>


      {loading ? (
        <Loader />
      ) : (

        <div className="flex flex-col pt-8 p-4 gap-6 justify-start">

          <div className="flex flex-col w-full items-center">

            <Avatar className="w-32 h-32">
              <AvatarImage src={baseURL + user.profileImg} alt="profile" />
              <AvatarFallback className="text-stone-900">{UsernameAvatarFallout(user.name, user.surname)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center">
              <Label className="text-2xl text-black">
                {user.name} {user.surname}
              </Label>

              {/* <Label className="text-stone-700 text-sm font-normal">{user.email}</Label> */}
              <Label className="text-stone-700 text-base font-normal">
                {user.facultad} - {user.carrera}
              </Label>
            </div>

          </div>


          <div className="flex flex-col">
            <Label className="font-medium text-base mb-2 flex gap-1.5 items-center">
              <Quote size="16" />
              Sobre mi
            </Label>
            <Card className="flex flex-col bg-stone-50 p-4">
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
