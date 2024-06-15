import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Square, ChevronLeft, SendHorizontal, EyeOff } from "lucide-react";

import "../App.css";
import assets from "@/Assets";
// import squadLogo from "/squad-logo-white.png";

const AboutPage = ({ currentuser }) => {
  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
        <img src={assets.logo1_white} className="h-full" />
        <Square color="transparent" />
      </Navbar>

      <div className="h-full w-full flex flex-col justify-between p-4 gap-4">
        <Label className="text-lg text-center">Dejanos tu sugerencia o reporta un Bug</Label>
        <Textarea className="min-h-96 shadow-sm" placeholder="Escribe aqui tu mensaje..." />
        <Button className="flex flex-row items-center gap-1 shadow-sm py-6"><SendHorizontal size="16"/>Enviar reporte</Button>
        <Label className="text-sm text-stone-400 font-normal flex items-center gap-1"><EyeOff size="10"/>No te preocupes, tu mensaje es anonimo.</Label>
      </div>
    </>
  );
};

export default AboutPage;
