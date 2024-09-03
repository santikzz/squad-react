import { Download, X } from "lucide-react";
import ButtonLoader from "./ButtonLoader";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const Install = () => {

    // window.addEventListener('load', () => {
    //     document.getElementById('slide-in').classList.add('animate-slide-up');
    // }); 

    const { isStandalone } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(true);

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
    });

    const installApp = async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    }

    if (isStandalone) return;

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <div className="flex flex-col px-4 pb-8">
                    <div className="flex flex-1 justify-end ">
                        <button className="" onClick={() => setIsOpen(false)}><X color="#d1d5db" /></button>
                    </div>
                    <label className="font-satoshi-medium text-lg mb-4">Para una mejor experiencia, instala la app o agrégala a tu pantalla de inicio</label>
                    <ButtonLoader id="installBtn" onClick={installApp}>
                        Agregar al inicio
                        <Download size={24} color="#fff" />
                    </ButtonLoader>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default Install;