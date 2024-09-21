import { Link } from "react-router-dom";
import { UserRound, Bell, Compass, PlusCircle, UsersRound } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";

const BottomNav = () => {
    const [badges, setBadges] = useState(0);
    const { environment } = useGlobalContext();

    useEffect(() => {
        try {
            setBadges(environment.notifications.badges);
        } catch (error) {
            setBadges(0);
        }
    }, [environment]);

    return (
        <div className="fixed bottom-0 pb-4 left-0 w-full bg-white border-t-[0.5px] border-gray-300 lg:hidden">
            <div className="w-full flex flex-row justify-between gap-4 pb-4 pt-3 px-8 items-center">
                <Link to="/">
                    <Compass size="24" strokeWidth="2" color="black" />
                </Link>
                <Link to="/mygroups">
                    <UsersRound size="24" strokeWidth="2" color="black" />
                </Link>
                <Link to="/create">
                    <PlusCircle size="24" strokeWidth="2" color="black" />
                </Link>
                <Link to="/notifications" className="grid justify-items-center relative">
                    {badges > 0 ?
                        <div className="absolute ml-3 bottom-3">
                            <div className={`bg-red-500 rounded-full w-[${badges < 9 ? '20' : '25'}px] h-[15px] flex items-center justify-center`}>
                                <Label className="text-white text-sm">{badges}</Label>
                            </div>
                        </div>
                        : null}
                    <Bell size="24" strokeWidth="2" color="black" />
                </Link>
                <Link to={"/settings"}>
                    <UserRound size="24" strokeWidth="2" color="black" />
                </Link>
            </div>
        </div>
    );
};

export default BottomNav;