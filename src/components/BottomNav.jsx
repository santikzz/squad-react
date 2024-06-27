import { Link, useNavigate } from "react-router-dom";
import { Settings, UserRound, Bell, BellDot, Home, SquarePlus } from "lucide-react";
import { Label } from "@radix-ui/react-label";

const BottomNav = ({ userdata, badgeCount }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-[1px] lg:hidden">

            <div className="w-full flex flex-row justify-between gap-4 py-4 px-8 items-center">

                <Link to="/" className="active:brightness-50">
                    <Home size="20" strokeWidth="2" color="black"></Home>
                </Link>

                <Link to="/settings" className="active:brightness-50">
                    <Settings size="20" strokeWidth="2" color="black"></Settings>
                </Link>

                <Link to="/create" className="active:brightness-50">
                    <SquarePlus size="26" strokeWidth="2" color="black"></SquarePlus>
                </Link>

                <Link to="/notifications" className="active:brightness-50 relative">
                    {badgeCount > 0 ?
                        <div className="absolute ml-3 bottom-3">
                            <div className={`bg-red-500 rounded-full w-[${badgeCount < 9 ? '20' : '25' }px] h-[15px] flex items-center justify-center`}>
                                <Label className="text-white text-sm">{badgeCount}</Label>
                            </div>
                        </div>
                        : null}
                    <Bell size="20" strokeWidth="2" color="black"></Bell>

                </Link>

                <Link to={"/user/" + userdata.ulid} className="active:brightness-50">
                    <UserRound size="20" strokeWidth="2" color="black"></UserRound>
                </Link>

            </div>

        </div>
    );
};

export default BottomNav;
