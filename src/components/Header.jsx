import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ChevronLeft, Square } from "lucide-react"


import assets from "@/Assets";
import MobileSidenav from "./MobileSidenav";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import HeaderButton from "@/components/HeaderButton";

const Header = () => {

    const { environment } = useGlobalContext();
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname == "/";
    const isMobile = window.innerWidth <= 768;

    return (
        <header className="flex h-16 items-center justify-between bg-dark-200 px-4 shadow-lg">

            {isHome ? (
                <MobileSidenav />

            ) : (
                <HeaderButton
                    className="lg:hidden"
                    onClick={() => navigate(`/`)}
                >
                    <ChevronLeft className="text-white" size={32} />
                </HeaderButton>
            )}

            <div className="flex items-center gap-2 justify-center lg:justify-start">
                <img src={assets.logo1_white} className="h-12" />
            </div>

            <div className={`relative flex items-center bg-dark-100 rounded-lg px-3 py-2 space-x-3 w-96 hidden lg:flex`}>
                <Search className="h-5 w-5 text-gray-500" />
                <input
                    className="w-full bg-transparent border-none text-base font-satoshi-medium outline-none text-white"
                    placeholder="Buscar..."
                    type="search"
                />
            </div>

            <div className="flex items-center gap-4">
                {isHome ? (
                    <HeaderButton
                        className={`lg:hidden  `}
                        onClick={() => setIsSearchVisible(!isSearchVisible)}
                    >
                        <Search className="text-white" size={32} />
                    </HeaderButton>
                ) : (
                    <Square className="opacity-0" size={32} />
                )}
                
                <HeaderButton
                    className="rounded-full hidden lg:flex"
                >
                    <Bell className="h-5 w-5 text-white" />
                </HeaderButton>
                <Avatar className="hidden lg:flex">
                    <AvatarImage alt="User avatar" src={api.API_URL + environment?.user.avatar} />
                    <AvatarFallback className="bg-gray-200">{environment?.user.avatarFallback}</AvatarFallback>
                </Avatar>
            </div>


        </header >
    );
}

export default Header;