import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Square, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

import "../App.css";
import assets from "@/Assets";

const Welcome = () => {

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                alert('User accepted the install prompt');
            } else {
                alert('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
        }
    };

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     localStorage.setItem('accept-home-screen', true);
    //     // window.location.reload();
    //     navigate('/login');
    // }

    return (
        <>
            {/* <div className="flex flex-col w-full min-h-screen gap-4 p-6 justify-between items-center">
                <Label className="text-lg text-justify font-normal">Para usar SQUAD en tu smartphone de la manera intencionada, porfavor toque en <span className="font-semibold">Opciones -&gt Agregar a la Pantalla de Inicio</span></Label>
                <img className="w-[80%]" src={assets.tuto}></img>
                <Button className="w-full" onClick={() => handleClick()}>Entiendo</Button>
            </div> */}
            <div className="w-full h-screen flex items-center justify-center ">
                {isInstallable && (
                    <Button
                        onClick={handleInstallClick}
                        className="px-16 py-2"
                    >
                        Install
                    </Button>
                )}
            </div>
        </>
    );
};

export default Welcome;
