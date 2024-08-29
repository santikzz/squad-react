import { Download, X } from "lucide-react";
import ButtonLoader from "./ButtonLoader";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";

const Install = () => {

    // window.addEventListener('load', () => {
    //     document.getElementById('slide-in').classList.add('animate-slide-up');
    // });

    const { isStandalone } = useGlobalContext();
    const [isHidden, setIsHidden] = useState(false);

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = event;
        // Update UI to show the install button
        const installBtn = document.getElementById('installBtn');
        installBtn.classList.remove('hidden');

        // Add event listener to the install button
        installBtn.addEventListener('click', () => {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // Clear the deferredPrompt so it can only be used once
                deferredPrompt = null;
            });
        });
    });

    if (isStandalone || isHidden) return;

    return (
        <div className={`absolute top-0 bottom-0 left-0 w-full bg-black/50 t z-20 flex flex-col justify-end`}>
            {/* <div id="slide-in" className="bg-gray-100 w-full flex flex-col px-6 pb-8 pt-6 gap-2 rounded-t-lg transform translate-y-full opacity-0 transition-all duration-700 ease-out"> */}
            <div className="bg-gray-100 w-full flex flex-col px-6 pb-8 pt-6 gap-2 rounded-t-lg">
                <div className="flex flex-1 justify-end ">
                    <button className="" onClick={() => setIsHidden(true)}><X /></button>
                </div>
                <div className="flex flex-row items-center">
                    <label className="font-satoshi-medium text-lg">Para una mejor experiencia, instala la app o agrégala a tu pantalla de inicio</label>
                    <Download size={96} color="#5ca3af" />
                </div>
                <ButtonLoader id="installBtn">
                    Agregar al inicio
                </ButtonLoader>
            </div>
        </div>
    );



}

export default Install;