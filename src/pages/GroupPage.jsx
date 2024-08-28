import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Square, Lock, LockOpen, ChevronLeft, Users, Forward, X, Ban, MessageCircle, EllipsisVertical, Trash, DoorOpen, Link as LucideLink, Share2, Clock, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import assets from "@/Assets";
import { FormatTimeAgo } from "@/components/services/Utils";
import { useGlobalContext } from "@/context/GlobalProvider";
import { api } from "@/components/services/Api";

const GroupPage = () => {

  const { groupId } = useParams();
  const [environment, setEnvironment] = useState(null);
  const [group, setGroup] = useState(null);
  const [leaveGroupDrawer, setLeaveGroupDrawer] = useState(false);
  const [deleteGroupDrawer, setDeleteGroupDrawer] = useState(false);
  const [memberOptionsDrawer, setMemberOptionsDrawer] = useState(false);
  const [optionsNav, setOptionsNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [memberKickId, setMemberKickId] = useState(null);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
    setLoading(false);
  }

  const fetchGroup = async () => {
    const { data, error } = await api.fetchGroup(groupId);
    if (data) {
      setGroup(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnvironment();
    fetchGroup();
  }, [refresh]);

  const handleJoinGroup = async () => {
    let action = group.user.hasJoinRequest ? "cancel" : "join";
    const { data, error } = await api.handleJoinGroup(group.ulid, action);
    if (data) {
      setRefresh(!refresh);
    } else {
      console.log(error);
    }
  };

  const handleLeaveGroup = async () => {
    const { data, error } = await api.handleLeaveGroup(group.ulid);
    if (data) {
      setRefresh(!refresh);
    } else {
      console.log(error);
    }
    setLeaveGroupDrawer(false);
  };

  const handleDeleteGroup = async () => {
    const { data, error } = await api.handleDeleteGroup(group.ulid);
    if (data) {
      setDeleteGroupDrawer(false);
      navigate("/");
    } else {
      console.log(error);
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

  const handleMemberKick = async () => {
    const { data, error } = await api.handleKickMember(group.ulid, memberKickId)
    if (data) {
      setRefresh(!refresh);
    } else {
      console.log(error);
    }
    setMemberOptionsDrawer(false);
  }

  const openMemberOptionsDrawer = (userId) => {
    setMemberKickId(userId);
    setMemberOptionsDrawer(true);
  }

  if (!isLoggedIn) return (<Navigate to="/login" />);
  if (!environment) return (<Loader />);

  return (
    <>
      <Toaster />
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <EllipsisVertical size="32" onClick={() => setOptionsNav(true)} />
      </Navbar>

      {group && (group.isOwner || group.user.isMember) ? (
        <Sheet open={optionsNav} onOpenChange={setOptionsNav}>
          <SheetContent side="right" className="flex flex-col justify-between bg-black border-stone-900 text-white">
            <>
              <SheetHeader className="mt-32">
              </SheetHeader>
              <SheetFooter className="w-full">
                {group.user.isMember && !group.isOwner ? (
                  <Button className="w-full bg-transparent outline outline-2 outline-red-500 text-red-500 flex gap-1.5 font-satoshi-medium" onClick={() => setLeaveGroupDrawer(true)}>
                    <DoorOpen size="16" />
                    Salir del grupo
                  </Button>
                ) : null}

                {group.isOwner && (
                  <div className="flex flex-col gap-6">
                    <Button className="w-full border-2 border-gray-400 text-gray-400 bg-transparent flex gap-1.5 font-satoshi-medium" onClick={() => navigate(`/edit/${group.ulid}`)}>
                      <Pencil size="16" />Editar grupo
                    </Button>

                    <Button className="w-full bg-transparent outline outline-2 outline-red-500 text-red-500 flex gap-1.5 font-satoshi-medium" onClick={() => setDeleteGroupDrawer(true)}>
                      <Trash size="16" /> Eliminar grupo
                    </Button>
                  </div>
                )}

              </SheetFooter>
            </>
          </SheetContent>
        </Sheet>
      ) : null}

      {!group ? <Loader /> : null}

      {group ? (
        <div className="pb-[100px]">
          <Drawer open={leaveGroupDrawer} onOpenChange={setLeaveGroupDrawer}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-satoshi-bold">¿Estas seguro que quieres salir del grupo?</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
              </DrawerHeader>
              <DrawerFooter>
                <Button className="bg-red-600 mb-10 font-satoshi-medium" onClick={() => handleLeaveGroup()}>
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
                <DrawerTitle className="font-satoshi-bold">¿Estas seguro que quieres eliminar este grupo?</DrawerTitle>
                <DrawerDescription className="font-satoshi-medium">Esta accion no se puede deshacer.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button className="bg-red-600 mb-10 font-satoshi-medium" onClick={() => handleDeleteGroup()}>
                  Eliminar
                </Button>
                <DrawerClose>
                  <Button className="w-full font-satoshi-medium" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer open={memberOptionsDrawer} onOpenChange={setMemberOptionsDrawer}>
            <DrawerContent>
              {/* <DrawerHeader>
                <DrawerTitle>¿Estas seguro que quieres eliminar este grupo?</DrawerTitle>
                <DrawerDescription>Esta accion no se puede deshacer.</DrawerDescription>
              </DrawerHeader> */}
              <DrawerFooter>
                <Button className="bg-red-600 mb-10 font-satoshi-bold" onClick={() => handleMemberKick()}>
                  <X />Expulsar
                </Button>
                <DrawerClose>
                  <Button className="w-full font-satoshi-medium" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <div className="bg-black flex flex-col px-3 py-3 shadow-lg">
            <div className="flex flex-row gap-3 items-center" onClick={() => navigate(`/user/${group.owner.ulid}`)}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={api.API_URL + group.owner.avatar} alt="profile" />
                <AvatarFallback>{group.owner.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col mt-0">
                {/* <Label className="flex gap-1 items-center text-stone-400 text-xs font-satoshi-medium">
                  <Clock size="12" />
                  {FormatTimeAgo(group.creationDate)}
                </Label> */}
                <Label className="text-lg text-white font-satoshi-bold">
                  {group.owner.name} {group.owner.surname}
                </Label>
                <Label className="text-stone-400 text-sm font-satoshi-medium">
                  {group.facultad} - {group.carrera}
                </Label>
              </div>
            </div>

            <div className="flex flex-col items-start mt-2 p-3 gap-1">
              <Label className="flex gap-1 items-center text-stone-400 text-sm font-satoshi-medium">
                <Clock size="12" />
                {FormatTimeAgo(group.creationDate)}
              </Label>
              <Label className="text-white text-xl font-satoshi-bold">{group.title}</Label>
            </div>
          </div>

          <div className="flex flex-col pt-4 px-4 gap-4 mb-4">
            <div className="flex flex-row gap-2 justify-between">
              <div className="flex flex-row gap-2">
                <div className="flex flex-row items-center bg-gradient rounded-lg py-2 px-3 text-stone-100 gap-1.5 shadow-sm">
                  {group.privacy == "open" ? <LockOpen size="18" strokeWidth="2" color="white"></LockOpen> : <Lock size="18" strokeWidth="2" color="white"></Lock>}
                  <Label className="text-base font-satoshi-bold">Grupo {group.privacy == "open" ? "abierto" : "cerrado"}</Label>
                </div>
                <div className="flex flex-row items-center bg-gradient rounded-lg py-2 px-3 text-stone-100 gap-1.5 shadow-sm">
                  <Users size="20" strokeWidth="2" color="white"></Users>
                  <Label className="text-base font-satoshi-bold">
                    {group.membersCount}
                    {group.maxMembers != null ? ` / ` + group.maxMembers : ""}
                  </Label>
                </div>
              </div>
              <button className="bg-transparent text-black active:text-stone-500 px-2" onClick={() => handleShareGroup()}>
                <Share2 />
              </button>
            </div>

            <div className="flex flex-col py-2">
              {/* <Label className="text-lg font-satoshi-bold">Descripcion</Label> */}
              {/* <Card className="min-h-24 flex p-4 bg-stone-50 font-satoshi-medium shadow-sm">{group.description}</Card> */}
              <label className="text-base font-satoshi-medium text-black">{group.description}</label>
            </div>

            <div className="flex flex-col">
              {/* {(isFull = group.maxMembers != null && group.membersCount >= group.maxMembers)}} */}

              {(!group.isOwner && !group.user.isMember) ? (

                group.maxMembers != null && group.membersCount >= group.maxMembers ? (
                  <Button className="bg-gradient active:brightness-75 h-12 shadow-sm flex flex-row gap-1 brightness-75">
                    <Ban />
                    <Label className="text-white text-base font-satoshi-bold">Grupo lleno</Label>
                  </Button>
                ) : group.user.hasJoinRequest ? (
                  <Button className="bg-gradient active:brightness-75 h-12 shadow-sm flex flex-row gap-1" onClick={handleJoinGroup}>
                    <X />
                    <Label className="text-white text-base font-satoshi-bold">Cancelar solicitud</Label>
                  </Button>
                ) : !group.user.isMember ? (
                  <Button className="bg-gradient active:brightness-75 h-12 shadow-sm flex flex-row gap-1" onClick={handleJoinGroup}>
                    <Forward />
                    <Label className="text-white text-base font-satoshi-bold">
                      {group.privacy == "closed" ? "Solicitar unirse" : "Unirse"}
                    </Label>
                  </Button>
                ) : null

              ) : null}

              {group.isOwner || group.user.isMember ? (
                <Button className="bg-gradient active:brightness-75 h-12 min-h-12 shadow-sm flex flex-row gap-1" onClick={() => navigate(`/group/chat/${group.ulid}`)}>
                  <MessageCircle />
                  <Label className="text-white text-base font-satoshi-bold">Abrir chat</Label>
                </Button>
              ) : null}
            </div>

            <div className="mt-4">
              {group.members.length > 0 ? (
                <Label className="font-satoshi-bold text-lg">Miembros</Label>
              ) : null}
            </div>

            <div className="flex flex-col gap-4">
              {group.members.map((member, idx) => (
                <div key={member.ulid} className="flex bg-white">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-2" onClick={() => navigate(`/user/${member.ulid}`)}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={api.API_URL + member.avatar} alt="profile" />
                        <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center mt-0">
                        <Label className="text-base text-stone-900 font-satoshi-medium">
                          {member.name} {member.surname}
                        </Label>
                      </div>
                    </div>
                    {group.isOwner ? (
                      <div className="p-2" onClick={() => openMemberOptionsDrawer(member.ulid)}>
                        <EllipsisVertical />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      ) : null}
      <BottomNav environment={environment}></BottomNav>
    </>
  );
};

export default GroupPage;
