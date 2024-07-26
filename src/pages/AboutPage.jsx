import { Link, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

import { useGlobalContext } from "@/context/GlobalProvider";
import Navbar from "@/components/Navbar";
import "../App.css";
import assets from "@/Assets";

const AboutPage = () => {

  const { isLoggedIn } = useGlobalContext();
  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
      </Navbar>
      <div className="h-screen absolute top-0 flex flex-col justify-between px-4 pt-24 pb-10">
        <div className="flex flex-col">
          <img src={assets.logo1_black} className="w-64" />
          <Label className="text-justify text-lg p-3 font-satoshi-medium text-gray-900">SQUAD es una plataforma integral en línea diseñada para facilitar la colaboración fluida entre los estudiantes, al proporcionar una solución centralizada para encontrar grupos de estudio. Creada pensando en la eficiencia, esta aplicación integra todas las funcionalidades necesarias en una única interfaz. Los estudiantes pueden crear fácilmente perfiles de usuario, formar y buscar grupos, y unirse a ellos, con la capacidad de filtrar por facultad, carrera, clase, exámenes o cualquier otro criterio relevante.</Label>
        </div>
        <div className="flex flex-col items-center">
          <Label className="text-center text-lg font-satoshi-medium text-gray-700">Creado por</Label>
          <Label className="text-center text-xl font-satoshi-bold">Santiago Bugnón</Label>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
