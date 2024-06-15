import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Square, ChevronLeft } from "lucide-react";

import "../App.css";
import assets from "@/Assets";
// import squadLogo from "/squad-logo-black.png";

const AboutPage = ({ currentuser }) => {
  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
        {/* <Square color="transparent" /> */}
      </Navbar>

      <div className="h-full flex flex-col justify-between p-4 gap-[6rem]">
        <div className="flex flex-col">
          <img src={assets.logo1_black} className="h-full" />
          <Label className="text-center text-stone-300 text-xs">SQUAD Version (BETA) 1.12424</Label>
          <p className="text-justify text-base p-5 text-stone-900">SQUAD es una plataforma integral en línea diseñada para facilitar la colaboración fluida entre los estudiantes, al proporcionar una solución centralizada para encontrar grupos de estudio. Creada pensando en la eficiencia, esta aplicación integra todas las funcionalidades necesarias en una única interfaz. Los estudiantes pueden crear fácilmente perfiles de usuario, formar y buscar grupos, y unirse a ellos, con la capacidad de filtrar por facultad, carrera, clase, exámenes o cualquier otro criterio relevante.</p>
        </div>

        <div className="flex flex-col">
          <Label className="text-center text-lg font-normal text-stone-500">
            Creado por: <br />
          </Label>
          <Label className="text-center text-xl">
            Santiago B. Llaurado <br />y<br /> Ana Olivia Todesco
          </Label>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
