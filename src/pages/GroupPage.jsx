import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import api from "@/components/services/Api";
import { UsernameAvatarFallout } from "@/components/services/Utils";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { Square, Lock, LockOpen, ChevronLeft, Users, Forward, X, Ban, MessageCircle, EllipsisVertical, Trash, DoorOpen, Link as LucideLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import squadLogo from "/squad-logo-white.png";

const GroupPage = ({ currentuser }) => {
  const navigate = useNavigate();

  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [leaveGroupDrawer, setLeaveGroupDrawer] = useState(false);
  const [deleteGroupDrawer, setDeleteGroupDrawer] = useState(false);
  const [optionsNav, setOptionsNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // const { toast } = useToast();

  useEffect(() => {
    setLoading(true);

    const fetchGroup = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`);

        if (response.status === 200) {
          setGroup(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching group:", error.message);
      }
    };

    fetchGroup();
  }, [refresh]);

  const handleJoinGroup = async () => {
    let action = group.user.hasJoinRequest ? "cancel" : "join";
    // action = group.user.isMember ? "leave" : action;

    try {
      const response = await api.get(`/groups/${action}/${group.ulid}`);
      if (response.status === 200) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMemberClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleOpenChat = () => {
    navigate(`/group/chat/${groupId}`);
  };

  const handleLeaveGroup = async () => {
    try {
      const response = await api.get(`/groups/leave/${group.ulid}`);
      if (response.status === 200) {
        setRefresh(!refresh);
        setLeaveGroupDrawer(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await api.delete(`/groups/${group.ulid}`);
      if (response.status === 200) {
        navigate("/");
        setDeleteGroupDrawer(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleShareGroup = () => {
    if (!navigator.clipboard) {
      toast("No se pudo copiar al portapapeles (No SSL Encryption HTTPS Error)", { variant: "destructive" });
    } else {
      toast("Enlace copiado al portapapeles!", {
        description: `group/${group.ulid}`,
      });
      navigator.clipboard.writeText(`group/${group.ulid}`);
    }
  };

  return (
    <>
      <Toaster />
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <img src={squadLogo} className="h-full"></img>
        <EllipsisVertical size="32" onClick={() => setOptionsNav(true)} />
      </Navbar>

      {group && (group.owner.ulid == currentuser.ulid || group.user.isMember) ? (
        <Sheet open={optionsNav} onOpenChange={setOptionsNav}>
          <SheetContent side="right" className="flex flex-col justify-between bg-black border-stone-900 text-white">
            <>
              <SheetHeader className="mt-32"></SheetHeader>
              <SheetFooter className="w-full">
                {group.user.isMember && group.owner.ulid != currentuser.ulid ? (
                  <Button className="w-full bg-transparent outline outline-2 outline-red-500 text-red-500 flex gap-1.5" onClick={() => setLeaveGroupDrawer(true)}>
                    <DoorOpen size="16" />
                    Salir del grupo
                  </Button>
                ) : null}

                {group.owner.ulid == currentuser.ulid ? (
                  <Button className="w-full bg-transparent outline outline-2 outline-red-500 text-red-500 flex gap-1.5" onClick={() => setDeleteGroupDrawer(true)}>
                    <Trash size="16" /> Eliminar grupo
                  </Button>
                ) : null}
              </SheetFooter>
            </>
          </SheetContent>
        </Sheet>
      ) : // <Square color="transparent" />
      null}

      {loading ? <Loader /> : null}

      {group ? (
        <>
          <Drawer open={leaveGroupDrawer} onOpenChange={setLeaveGroupDrawer}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>¿Estas seguro que quieres salir del grupo?</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
              </DrawerHeader>
              <DrawerFooter>
                <Button className="bg-red-600 mb-10" onClick={() => handleLeaveGroup()}>
                  Salir
                </Button>
                <DrawerClose>
                  <Button className="w-full" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer open={deleteGroupDrawer} onOpenChange={setDeleteGroupDrawer}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>¿Estas seguro que quieres eliminar este grupo?</DrawerTitle>
                <DrawerDescription>Esta accion no se puede deshacer.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button className="bg-red-600 mb-10" onClick={() => handleDeleteGroup()}>
                  Eliminar
                </Button>
                <DrawerClose>
                  <Button className="w-full" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <div className="bg-black h-40 flex flex-col px-4 py-6 gap-4 shadow-lg">
            <div className="flex flex-row gap-2" onClick={() => handleMemberClick(group.owner.ulid)}>
              <Avatar>
                <AvatarImage src={group.owner.profileImg} alt="profile" />
                <AvatarFallback>{UsernameAvatarFallout(group.owner.name, group.owner.surname)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col mt-0">
                <Label className="text-sm text-white">
                  {group.owner.name} {group.owner.surname}
                </Label>
                <Label className="text-stone-400 text-xs font-normal">
                  {group.facultad} / {group.carrera}
                </Label>
              </div>
            </div>

            <div className="flex h-full items-center">
              <Label className="text-white text-lg">{group.title}</Label>
            </div>
          </div>

          <div className="flex flex-col pt-4 px-4 gap-4 mb-4">
            <div className="flex flex-row gap-2 justify-between">
              <div className="flex flex-row gap-2">
                <div className="flex flex-row items-center bg-gradient rounded-lg py-2 px-3 text-stone-100 gap-1.5 shadow-sm">
                  {group.privacy == "open" ? <LockOpen size="18" strokeWidth="2" color="white"></LockOpen> : <Lock size="18" strokeWidth="2" color="white"></Lock>}
                  <Label className="text-normal font-medium">Grupo {group.privacy == "open" ? "abierto" : "cerrado"}</Label>
                </div>
                <div className="flex flex-row items-center bg-gradient rounded-lg py-2 px-3 text-stone-100 gap-1.5 shadow-sm">
                  <Users size="20" strokeWidth="2" color="white"></Users>
                  <Label className="text-normal font-medium">
                    {group.membersCount}
                    {group.maxMembers != null ? `/` + group.maxMembers : ""}
                  </Label>
                </div>
              </div>
              <button className="bg-transparent text-black active:text-stone-500 px-2" onClick={() => handleShareGroup()}>
                <Share2 />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Descripcion</Label>
              <Card className="min-h-24 flex p-4 bg-stone-50 shadow-sm">{group.description}</Card>
            </div>

            <div className="flex flex-col">
              {/* {(isFull = group.maxMembers != null && group.membersCount >= group.maxMembers)}} */}

              {group.owner.ulid != currentuser.ulid ? (
                group.maxMembers != null && group.membersCount >= group.maxMembers ? (
                  <Button className="bg-gradient active:brightness-75 min-h-12 text-white font-medium shadow-sm brightness-75">
                    <Ban /> Grupo lleno
                  </Button>
                ) : group.user.hasJoinRequest ? (
                  <Button className="bg-gradient active:brightness-75 min-h-12 text-white font-medium shadow-sm" onClick={handleJoinGroup}>
                    <X /> Cancelar solicitud
                  </Button>
                ) : !group.user.isMember ? (
                  <Button className="bg-gradient active:brightness-75 min-h-12 text-white font-medium shadow-sm" onClick={handleJoinGroup}>
                    <Forward /> {group.privacy == "closed" ? "Solicitar unirse" : "Unirse"}
                  </Button>
                ) : null
              ) : null}

              {group.owner.ulid == currentuser.ulid || group.user.isMember ? (
                <Button className="bg-gradient active:brightness-75 min-h-12 text-white font-medium shadow-sm" onClick={handleOpenChat}>
                  <MessageCircle /> Abrir chat
                </Button>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Miembros</Label>

              {group.members.map((member, idx) => (
                <Card key={member.ulid} onClick={() => handleMemberClick(member.ulid)} className="flex bg-stone-50 p-4 shadow-sm active:brightness-95">
                  <div className="flex flex-row gap-2">
                    <Avatar>
                      <AvatarImage src={member.profileImg} alt="profile" />
                      <AvatarFallback>{UsernameAvatarFallout(member.name, member.surname)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center mt-0">
                      <Label className="text-sm text-stone-900">
                        {member.name} {member.surname}
                      </Label>
                      {/* <Label className="text-stone-400 text-xs font-light">{member.facultad} | {member.carrera}</Label> */}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default GroupPage;
