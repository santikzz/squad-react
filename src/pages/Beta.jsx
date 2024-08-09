import { Link, useNavigate, Navigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft, FlaskConical } from "lucide-react";

import { useGlobalContext } from "@/context/GlobalProvider";
import Navbar from "@/components/Navbar";
import "../App.css";
import assets from "@/Assets";

const Beta = () => {

    const navigate = useNavigate();
    const { isLoggedIn } = useGlobalContext();
    if (!isLoggedIn) return (<Navigate to="/login" />);

    return (
        <>
            <Navbar>
                <Link to="/">
                    <ChevronLeft size="32" strokeWidth="2" />
                </Link>
                <FlaskConical size="32" strokeWidth="2" />
            </Navbar>

            <div className="flex flex-col gap-4 w-full p-4">
                <Label className="text-lg font-bold text-center">[ BETA 0.24.07.02 ]</Label>

                <Label className="font-semibold">[ CHANGELOG 2/7/24 ]</Label>
                <ul className="list-disc ml-4">
                    <li>Added: Editar Grupo</li>
                    <li>Added: Notificaciones cuando un usuario se une y cuando tu solicitud es aceptada</li>
                </ul>

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
                    <li>Feed LazyLoad</li>
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
