import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings, LogOut, UserRound, Plus, Bug, Info, Bell, FlaskConical, UsersRound, Users } from "lucide-react"

import { useGlobalContext } from "@/context/GlobalProvider";

const NavItem = ({ to, children }) => {

    const location = useLocation();

    return (
        <Link
            to={to}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-gray-400 transition-all hover:bg-stone-800 hover:text-gray-100 transition-all duration-150 ${location.pathname == to && 'bg-stone-700 text-gray-100'}`}
        >
            {children}
        </Link >
    );

}

const DesktopSidenav = () => {

    const { environment } = useGlobalContext();

    return (
        <aside className="w-64 border-r bg-dark-100 hidden lg:block">
            <nav className="flex flex-col h-full justify-between p-4">

                <div className="flex flex-col gap-2">
                    <NavItem to="/">
                        <Home className="h-4 w-4" />
                        Inicio
                    </NavItem>

                    <NavItem to="/mygroups">
                        <Users className="h-4 w-4" />
                        Grupos unidos
                    </NavItem>

                    <NavItem to="/mygroups">
                        <Users className="h-4 w-4" />
                        Tus grupos
                    </NavItem>
                </div>

                <div className="flex flex-col gap-2">

                    <NavItem to="/settings">
                        <Settings className="h-4 w-4" />
                        Opciones
                    </NavItem>
                    <NavItem to="/about">
                        <Info className="h-4 w-4" />
                        Más Info
                    </NavItem>

                </div>

            </nav>
        </aside>
    );

}

export default DesktopSidenav;