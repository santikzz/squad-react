import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ChevronLeft, Ghost, Square } from "lucide-react";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import assets from "@/Assets";
import { useGlobalContext } from "@/context/GlobalProvider";
import GroupCard from "@/components/GroupCard";
import GroupCardSkeleton from "@/components/GroupCardSkeleton";

const SelfGroups = () => {

    const [option, setOption] = useState(true);
    const [environment, setEnvironment] = useState(null);
    const [joinedGroups, setJoinedGroups] = useState(null);
    const [ownedGroups, setOwnedGroups] = useState(null);
    const { isLoggedIn } = useGlobalContext();

    const fetchEnvironment = async () => {
        const { data, error } = await api.fetchEnvironment()
        if (data) {
            setEnvironment(data);
        }
    }

    const fetchJoinedGroups = async () => {
        const { data, error } = await api.fetchJoinedGroups()
        if (data) {
            setJoinedGroups(data);
        }
    }

    const fetchOwnedGroups = async () => {
        const { data, error } = await api.fetchOwnedGroups()
        if (data) {
            setOwnedGroups(data);
        }
    }

    useEffect(() => {
        try {
            fetchEnvironment();
            fetchJoinedGroups();
            fetchOwnedGroups();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const showJoined = () => {
        setOption(true);
    };
    const showOwned = () => {
        setOption(false);
    };

    if (!isLoggedIn) return (<Navigate to="/login" />);

    return (
        <>
            <Navbar>
                <Link to="/" className="active:brightness-75">
                    <ChevronLeft size="32" />
                </Link>
            </Navbar>

            <div className="p-3 lg:hidden">
                <div className="relative w-full border-[1px] border-gray-200 rounded-md flex flex-row">
                    <button
                        type="button"
                        onClick={showJoined}
                        className={`z-10 py-2 px-6 flex-1 transition-text duration-200 ease-in-out ${option ? 'text-white' : null}`}
                    >
                        <label className='font-satoshi-medium text-base'>Unidos</label>
                    </button>
                    <button
                        type="button"
                        onClick={showOwned}
                        className={`z-10 py-2 px-6 flex-1 transition-text duration-200 ease-in-out ${!option ? 'text-white' : null}`}
                    >
                        <label className='font-satoshi-medium text-base'>Tus Grupos</label>
                    </button>
                    <div className={`absolute ${option ? 'left-0' : 'translate-x-full'} bottom-0 h-full w-[50%] rounded-md bg-gradient flex-1 -z-10 transition-all duration-200 ease-in-out`} />
                </div>
            </div>

            {(!environment || !joinedGroups || !ownedGroups) ? <GroupCardSkeleton /> : (
                <>

                    {(!option && ownedGroups?.length == 0) || (option && joinedGroups?.length == 0) && (
                        <div className="w-full mt-[50%] justify-start flex flex-flex justify-center items-center text-gray-300 px-8 gap-2">
                            <Ghost size="200" strokeWidth={1.5} color="#f3f4f6" />
                            {/* <label className="text-2xl text-center font-satoshi-bold text-2xl">zzzz...</label> */}
                        </div>
                    )}

                    <div className="pb-[100px]">
                        <div className={`lg:h-full flex flex-col p-3 gap-3 lg:grid lg:grid-cols-3 bg-white ${!option ? 'hidden' : null}`}>
                            {joinedGroups.map((group, idx) => (
                                <GroupCard group={group} key={group.ulid} />
                            ))}
                        </div>

                        <div className="relative text-center justify-center hidden lg:flex">
                            <label className="font-satoshi-medium text-gray-300 bg-white px-3 z-10">Tus grupos</label>
                            <div className="h-[1px] bg-gray-300 absolute w-[95%] top-[50%] -z-10" />
                        </div>
                        <div className={`lg:h-full flex flex-col p-3 gap-3 lg:grid lg:grid-cols-3 bg-white ${option ? 'hidden' : null}`}>
                            {ownedGroups.map((group, idx) => (
                                <GroupCard group={group} key={group.ulid} />
                            ))}
                        </div>
                    </div>
                </>
            )}
            <BottomNav environment={environment}></BottomNav>
        </>
    );
};

export default SelfGroups;