import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Menu, Search, X, Ghost, ChevronDown, Filter } from "lucide-react";

// import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Home, User } from "lucide-react"

import "../App.css";
import GroupCard from "@/components/GroupCard";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import GroupCardSkeleton from "@/components/GroupCardSkeleton";
import useDebounce from "@/hooks/useDebounce";
import SlideSheet from "@/components/SlideSheet";
import assets from "@/Assets";
import Header from "@/components/Header";
import DesktopSidenav from "@/components/DesktopSidenav";
import Wrapper from "@/components/Wrapper";
import CreateGroupPage from "./CreateGroupPage";
import CreateGroupCard from "@/components/CreateGroupCard";

const HomePage = () => {

  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, environment } = useGlobalContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [page, setPage] = useState(1);

  /* ==== search ==== */
  const searchInputRef = useRef();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSerachQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debouncedSearch = () => { setDebouncedQuery(searchQuery); }
  useDebounce(debouncedSearch, 600, [searchQuery]);

  const fetchGroups = async () => {
    setGroupsLoading(true);
    const { data, error } = await api.fetchGroups({
      search: searchQuery
    });
    if (data) {
      setGroups(data.data);
    }
    setGroupsLoading(false);
  }

  useEffect(() => {
    fetchGroups();
  }, [debouncedQuery, page])


  const closeSearch = () => {
    setShowSearch(false);
    setSerachQuery('');
    setDebouncedQuery('');
  }

  const openSearch = () => {
    setShowSearch(true);
    searchInputRef.current.focus();
  }


  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (

    <Wrapper>
      <div className="flex justify-between h-full">

        <div className="lg:w-full lg:mx-64 space-y-4 p-4">
          {groups.map((group, idx) => (
            <GroupCard group={group} key={idx} className="w-full"/>
          ))}
        </div>

        <div className="flex flex-col w-[80rem] bg-white h-full p-4 hidden lg:flex">
          <div className="w-full flex justify-center pt-5">
            <Label className="text-2xl font-satoshi-bold">Nuevo grupo</Label>
          </div>
          <CreateGroupCard />
        </div>


      </div>
    </Wrapper>

  );
};

export default HomePage;
