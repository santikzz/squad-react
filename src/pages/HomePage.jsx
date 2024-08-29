import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Menu, Search, X, Ghost, ChevronDown, Filter } from "lucide-react";

// import { Switch } from "@/components/ui/switch";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { Check, ChevronsUpDown } from "lucide-react"

import "../App.css";
import GroupCard from "@/components/GroupCard";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import GroupCardSkeleton from "@/components/GroupCardSkeleton";
import useDebounce from "@/hooks/useDebounce";
import SlideSheet from "@/components/SlideSheet";
import assets from "@/Assets";

const HomePage = () => {

  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useGlobalContext();

  const [environment, setEnvironment] = useState(null);
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

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
  }

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
    if (!environment) {
      fetchEnvironment();
    }
    fetchGroups();
  }, [debouncedQuery, page])


  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0 && !groupsLoading) {
  //       setMoreLoading(true);
  //       setPage(prevPage => prevPage + 1);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [groupsLoading]);


  const closeSearch = () => {
    setShowSearch(false);
    setSerachQuery('');
    setDebouncedQuery('');
  }

  const openSearch = () => {
    setShowSearch(true);
    searchInputRef.current.focus();
  }

  // const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState("")

  // const frameworks = [
  //   {
  //     value: "next.js",
  //     label: "Next.js",
  //   },
  //   {
  //     value: "sveltekit",
  //     label: "SvelteKit",
  //   },
  //   {
  //     value: "nuxt.js",
  //     label: "Nuxt.js",
  //   },
  //   {
  //     value: "remix",
  //     label: "Remix",
  //   },
  //   {
  //     value: "astro",
  //     label: "Astro",
  //   },
  // ]

  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <div className={`relative shadow-md w-full z-30 sticky top-0 left-0 right-0 h-16 bg-black flex flex-row text-white justify-between items-center border-b-[1px] border-gray-700 ${showSearch && 'h-24'} transition-all	duration-200 ease-in-out`}>
        <div className={`absolute left-2/4 -translate-x-2/4 w-[200px] ${showSearch && 'hidden'}`}>
          <img src={assets.logo1_white} className="w-full" />
        </div>
        <div className={`absolute left-0 top-0 bottom-0 items-center px-6 flex flex-row justify-between w-full ease-in ${showSearch ? 'hidden' : 'flex'} z-10`}>
          <Menu size="32" strokeWidth="2" onClick={() => setSidenavOpen(true)} />
          <Search className="active:brightness-50" size="32" strokeWidth="2" onClick={openSearch} />
        </div>
        <div className={`absolute left-0 top-0 py-4 px-6 flex flex-col gap-3 w-full transition-opacity duration-300 ease-in-out	${showSearch ? 'opacity-1' : 'opacity-0'} -z-10`}>
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center w-96 px-3 py-2 rounded-full bg-stone-800">
              <Search />
              <input
                className="ml-2 bg-transparent text-white outline-none font-satoshi-medium"
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSerachQuery(e.target.value)}
              />
            </div>
            <X size="32" onClick={closeSearch} />
          </div>
          <div className={`flex flex-row gap-3 items-center transition-opacity duration-600 ease-in ${showSearch ? 'opacity-1' : 'opacity-0'}`}>


            {/* <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>

                <button
                  className="flex flex-row items-center justify-between font-satoshi-medium gap-1 bg-stone-800 rounded-full px-2 py-1"
                >
                  <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  {value ? trimString(frameworks.find((framework) => framework.value === value)?.label, 12) : "Carrera"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>

              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0 ml-6 mt-4 dark">
                <Command>
                  <CommandInput placeholder="Buscar..." />
                  <CommandList>
                    <CommandEmpty>Sin resultados</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${value === framework.value ? 'opacity-100' : 'opacity-0'}`}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover> */}

          </div>
        </div>
      </div>

      {(!groups || !environment || groupsLoading) ? (<GroupCardSkeleton />) : (
        <>
          <SlideSheet open={sidenavOpen} onOpenChange={setSidenavOpen} environment={environment} />
          {/* no groups text */}
          {!groupsLoading && groups.length == 0 ? (
            <div className="absolute inset-y-2/4 w-full flex items-center bg-white">
              <div className="w-full flex flex-col items-center text-gray-300 px-8 gap-2">
                <Ghost size="48" />
                {showSearch ? (
                  <Label className="text-2xl text-center font-satoshi-bold text-2xl">No se encontraron resultados para '{searchQuery}'</Label>
                ) : (
                  <Label className="text-2xl text-center font-satoshi-bold text-2xl">No hay grupos, crea uno nuevo</Label>
                )}
              </div>
            </div>
          ) : null}
          {/* groups map */}
          <div className="pb-[100px] lg:h-full flex flex-col p-3 gap-3 lg:grid lg:grid-cols-3 bg-white">
            {groups.map((group, idx) => (
              <GroupCard group={group} key={idx} />
            ))}
          </div>
        </>
      )}
      <BottomNav environment={environment}></BottomNav>
    </>
  );
};

export default HomePage;
