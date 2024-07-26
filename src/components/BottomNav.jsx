import { Link } from "react-router-dom";
import { Settings, UserRound, Bell, Home, SquarePlus, Search } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

const BottomNav = ({ environment }) => {

    const [badges, setBadges] = useState(0);
    useEffect(() => {
        setBadges(environment.notifications.badges);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-[0.5px] border-gray-300 lg:hidden">

            <div className="w-full flex flex-row justify-between gap-4 py-4 px-8 items-center">

                <Link to="/" className="active:brightness-50 grid justify-items-center">
                    <Home size="24" strokeWidth="2" color="black" />
                    {/* <Label className="text-sm font-satoshi-medium ">Inicio</Label> */}
                </Link>
                <Link to="/settings" className="active:brightness-50 grid justify-items-center">
                    <Settings size="24" strokeWidth="2" color="black" />
                    {/* <Label className="text-sm font-satoshi-medium ">Opciones</Label> */}
                </Link>
                <Link to="/create" className="active:brightness-50 grid justify-items-center">
                    <SquarePlus size="26" strokeWidth="2" color="black" />
                    {/* <Label className="text-sm font-satoshi-medium ">Nuevo</Label> */}
                </Link>

                <Link to="/notifications" className="active:brightness-50 grid justify-items-center relative">
                    {badges > 0 ?
                        <div className="absolute ml-3 bottom-3">
                            <div className={`bg-red-500 rounded-full w-[${badges < 9 ? '20' : '25'}px] h-[15px] flex items-center justify-center`}>
                                <Label className="text-white text-sm">{badges}</Label>
                            </div>
                        </div>
                        : null}
                    <Bell size="24" strokeWidth="2" color="black" />
                    {/* <Label className="text-sm font-satoshi-medium "></Label> */}
                </Link>

                <Link to={"/user/" + environment.user.ulid} className="active:brightness-50 grid justify-items-center">
                    <UserRound size="24" strokeWidth="2" color="black" />
                    {/* <Label className="text-sm font-satoshi-medium ">Perfil</Label> */}
                </Link>

            </div>

        </div>
    );
};

export default BottomNav;
