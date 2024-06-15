import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Square, ChevronLeft, SendHorizontal } from "lucide-react";

import assets from "@/Assets";
// import squadLogo from "/squad-logo-white.png";

const GroupChatPage = () => {
  const { groupId } = useParams();

  return (
    <>
      <Navbar>
        <Link to={`/group/${groupId}`} className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <img src={assets.logo1_white} className="h-full"></img>
        <Square color="transparent" />
      </Navbar>

      <div className="w-full flex flex-col justify-between p-2 gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-stone-400 text-light text-xs">Santiago Nicolas</Label>
          <div className="bg-gradient pr-3 pl-4 py-2 w-fit max-w-80 rounded-lg flex justify-between items-end gap-3">
            <Label className="text-white text-base">this is a cool messaje</Label>
            <Label className="text-xs text-stone-50">14:27</Label>
          </div>
        </div>

        <div className="bg-gradient px-4 py-2 w-fit max-w-80 rounded-lg">
          <Label className="text-stone-50">this is a cool messaje</Label>
        </div>
        <div className="bg-gradient px-4 py-2 w-fit max-w-80 rounded-lg">
          <Label className="text-stone-50">this is a cool messaje this is a cool messaje this is a cool messaje this is a cool messaje this is a cool messaje this is a cool messaje this is a cool messaje this is a cool messaje </Label>
        </div>
        <div className="bg-gradient px-4 py-2 w-fit max-w-80 rounded-lg">
          <Label className="text-stone-50">this is a cool messaje</Label>
        </div>
        <div className="bg-gradient px-4 py-2 w-fit max-w-80 rounded-lg">
          <Label className="text-stone-50">this is a cool messaje</Label>
        </div>
      </div>

      <div className="w-full p-4 fixed bottom-0 flex flex-row gap-2">
        <Input className="bg-stone-200 rounded-full px-4" placeholder="Mensaje..."></Input>
        <Button className="rounded-full w-10 h-10 p-2">
          <SendHorizontal />
        </Button>
      </div>
    </>
  );
};

export default GroupChatPage;
