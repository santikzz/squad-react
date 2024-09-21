import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Lock, LockOpen, Clock, Users } from "lucide-react";

import { FormatTimeAgo, trimString } from "@/components/services/Utils";
import { api } from "./services/Api";

const GroupCard = ({ group, className }) => {

    const navigate = useNavigate();

    return (

        <Card
            className={`w-full shadow-md border-[0.5px] border-gray-300 bg-white active:brightness-95 flex flex-col rounded-lg ${className}`}
            onClick={() => navigate(`/group/${group?.ulid}`)}
        >

            <div className="flex flex-row items-center gap-2 p-3 bg-gray-100 rounded-t-xl">
                <Avatar className="w-14 h-14">
                    <AvatarImage src={api.API_URL + group?.owner.avatar} alt="profile" />
                    <AvatarFallback className="bg-gray-200 border-[1px] border-gray-400">{group?.owner.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                        <Label className="text-base font-satoshi-bold">
                            {group?.owner.name} {group?.owner.surname}
                        </Label>
                        <Label className="flex gap-0.5 items-center text-stone-400 text-xs font-satoshi-medium">
                            <Clock size="12" />
                            {FormatTimeAgo(group?.creationDate)}
                        </Label>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <Label className="text-gray-500 text-xs font-satoshi-medium">
                            {group?.facultad} - {group?.carrera}
                        </Label>
                    </div>
                </div>
            </div>

            <div className="w-full h-[0.5px] bg-gray-300"></div>

            <div className="flex flex-col p-3 gap-1 h-full">
                <Label className="text-lg font-satoshi-bold">{group?.title}</Label>
                <p className="text-base font-satoshi-medium text-gray-800">{trimString(group?.description, 100)}</p>
            </div>

            <div className="flex flex-row justify-between p-3">
                <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm min-w-32 justify-center">
                    {group?.privacy == "open" ? <LockOpen size="18" strokeWidth="2" color="white"></LockOpen> : <Lock size="18" strokeWidth="2" color="white"></Lock>}
                    <Label className="text-sm font-satoshi-bold">Grupo {group?.privacy == "open" ? "abierto" : "cerrado"}</Label>
                </div>
                <div className="flex flex-row items-center bg-gradient rounded-lg py-1.5 px-2.5 text-stone-100 gap-1.5 shadow-sm min-w-16 justify-center">
                    <Users size="18" strokeWidth="2" color="white"></Users>
                    <Label className="text-sm font-satoshi-bold">
                        {group?.membersCount}
                        {group?.maxMembers != null ? ` / ` + group?.maxMembers : ""}
                    </Label>
                </div>
            </div>

        </Card>
    );

};

export default GroupCard;