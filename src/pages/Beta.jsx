import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";

import { ChevronLeft, FlaskConical } from "lucide-react";

import "../App.css";
import assets from "@/Assets";
import { Label } from "@radix-ui/react-label";

const Beta = () => {

    return (
        <>
            <Navbar>
                <Link to="/">
                    <ChevronLeft size="32" strokeWidth="2" />
                </Link>
                <img src={assets.logo1_white} className="h-full" />
                <FlaskConical size="32" strokeWidth="2" />
            </Navbar>

            <div className="flex flex-col gap-4 w-full p-4">
                <Label className="text-lg font-bold text-center">[ BETA 0.24.06.27 ]</Label>

                <Label className="font-semibold">[ Cosas que aun no funcionan ]</Label>
                <ul className="list-disc ml-4">
                    <li>Reporte de usuarios</li>
                    <li>Notificaciones push (HTTPS SSL REQUIRED)</li>
                    <li>Copiar link invitacion al portapapeles (HTTPS SSL REQUIRED)</li>
                </ul>

                <Label className="font-semibold">[ Cosas aun sin implementar ]</Label>
                <ul className="list-disc ml-4">
                    <li>Chat de grupo</li>
                    <li>Inicio de sesion por Google</li>
                </ul>

                <Label className="font-semibold">[ Otros ]</Label>
                <ul className="list-disc ml-4">
                    <li>De momento el feed de grupos no va a estar filtrada por facultades/carreras por motivos de testing</li>
                </ul>

            </div>

        </>
    );
};

export default Beta;
