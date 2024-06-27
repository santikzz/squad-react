import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Square, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

import "../App.css";
import assets from "@/Assets";

const Welcome = () => {

    const handleClick = () => {
        localStorage.setItem('accept-home-screen', true);
        window.location.reload();
    }

    return (
        <>
            <div className="flex flex-col w-full min-h-screen gap-4 p-6 justify-between items-center">
                <Label className="text-lg text-justify font-normal">Para usar SQUAD en tu smartphone de la manera intencionada, porfavor toque en <span className="font-semibold">Opciones -&gt Agregar a la Pantalla de Inicio</span></Label>
                <img className="w-[80%]" src={assets.tuto}></img>
                <Button className="w-full" onClick={() => handleClick()}>Entiendo</Button>
            </div>
        </>
    );
};

export default Welcome;
