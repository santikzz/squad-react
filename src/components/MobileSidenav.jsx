
import { Button } from "@/components/ui/button"

import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Menu, Settings, LogOut, UserRound, Plus, Bug, Info, Bell, FlaskConical, UsersRound } from "lucide-react";

import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import HeaderButton from "./HeaderButton";


const MobileSidenav = () => {

    const navigate = useNavigate();
    const { setIsLoggedIn, isLoggedIn, environment } = useGlobalContext();

    const handleLogout = async () => {
        const response = await api.logout();
        if (response) {
            setIsLoggedIn(false);
            api.setAuthToken(null);
            localStorage.clear("token");
            navigate("/login");
        }
    };


    return (
        <Sheet>
            <SheetTrigger asChild>
                <HeaderButton className='lg:hidden'>
                    <Menu size={32} />
                </HeaderButton>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col justify-between bg-black border-stone-900 text-white">
                <SheetHeader>
                    <div className="flex flex-row gap-3 items-center my-12 items-center">
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={api.API_URL + environment?.user.avatar} />
                            <AvatarFallback className="bg-gray-200">{environment?.user.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <Label className="text-white text-xl text-wrap font-satoshi-medium">
                                {environment?.user.name} {environment?.user.surname}
                            </Label>
                            <Label className="text-gray-500 text-xs font-satoshi-medium text-left">
                                {environment?.user.facultad} - {environment?.user.carrera}
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <Link to={"/user/" + environment?.user.ulid} className="flex flex-row justify-start items-center">
                            <UserRound className="w-6 mr-2" color="#d1d5db" />
                            <Label className="font-satoshi-medium text-xl text-gray-300">Perfil</Label>
                        </Link>
                        <Link to="/settings" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                            <Settings className="w-6 mr-2" color="#d1d5db" />
                            <Label className="font-satoshi-medium text-xl text-gray-300">Opciones</Label>
                        </Link>
                        <Link to="/notifications" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                            <Bell className="w-6 mr-2" color="#d1d5db" />
                            <Label className="font-satoshi-medium text-xl text-gray-300">Notificaciones</Label>
                        </Link>
                        <Link to="/mygroups" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                            <UsersRound className="w-6 mr-2" color="#d1d5db" />
                            <Label className="font-satoshi-medium text-xl text-gray-300">Grupos</Label>
                        </Link>
                        <button className="flex flex-row font-satoshi-medium text-xl bg-gradient rounded-md py-2 items-center justify-center active:brightness-75" onClick={() => navigate(`/create`)}>
                            <Plus className="w-6 mr-2" color="#d1d5db" />
                            <Label className="font-satoshi-medium text-xl text-gray-300">Nuevo grupo</Label>
                        </button>
                    </div>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                    {/* <Link to="/betainfo" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                        <FlaskConical className="w-6 mr-2" color="#d1d5db" />
                        <Label className="font-satoshi-medium text-xl text-gray-300">BETA INFO</Label>
                    </Link> */}
                    <Link to="/about" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                        <Info className="w-6 mr-2" color="#d1d5db" />
                        <Label className="font-satoshi-medium text-xl text-gray-300">Más Info</Label>
                    </Link>
                    <Link to="/report" className="flex flex-row font-satoshi-medium justify-start items-center text-xl">
                        <Bug className="w-6 mr-2" color="#d1d5db" />
                        <Label className="font-satoshi-medium text-xl text-gray-300">Bugs & Sugerencias</Label>
                    </Link>
                    <button className="flex flex-row font-satoshi-medium justify-start items-center text-xl" onClick={() => handleLogout()}>
                        <LogOut className="w-6 mr-2" color="#d1d5db" />
                        <Label className="font-satoshi-medium text-xl text-gray-300">Cerrar sesion</Label>
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );

}

export default MobileSidenav;