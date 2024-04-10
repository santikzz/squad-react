import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "@/components/services/Api";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { Square, Lock, LockOpen, ChevronLeft, Plus } from "lucide-react";

import squadLogo from "/squad-logo-white.png";

const CreateGroup = () => {
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    privacy: "open",
    maxMembers: 0,
    idCarrera: 0,
    tags: ["none"], // temporarely voided
  });

  const [facultades, setFacultades] = useState([]);
  const [selectedFacultad, setSelectedFacultad] = useState(0);
  const [carreras, setCarreras] = useState([]);
  const [memberLimitChecked, setMemberLimitChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const response = await api.get("/facultades");

        console.log(response);

        if (response.status === 200) {
          setFacultades(response.data);
          setCarreras(response.data[0]["carreras"]);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFacultades();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroupData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleTagChange = (newTags) => {
  //   setGroupData((prevData) => ({
  //     ...prevData,
  //     tags: newTags,
  //   }));
  // };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const response = await createGroup(groupData);
    // // console.log(response);
    // if (!response.hasOwnProperty('error')) {
    //   alert("debug: group created successfully!");
    //   navigate("/groups/"+response.ulid);
    // } else {
    //   alert("debug: group creation failed. (" + response.error.code + ")");
    // }
  };

  const handleSelectFacultad = (event) => {

      const facultadKey = event.target.value;
      // setSelectedFacultad(facultadKey);
      setCarreras(facultades[facultadKey]["carreras"]);

    // console.log(event);
  };

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
        <img src={squadLogo} className="h-full"></img>
        <Square color="transparent" />
      </Navbar>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-center pt-5">
            <Label className="text-xl">Nuevo grupo</Label>
          </div>

          <form className="flex flex-col gap-4 p-4">
            <div className="grid w-full items-center gap-1.5">
              <Label>Titulo</Label>
              <Input type="text" value={groupData.title} onChange={handleChange} required />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label>Facultad</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent>
                  {facultades.map((facultad, idx) => (
                    <SelectItem key={idx} value={facultad.id}>
                      {facultad.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label>Carrera</Label>
              <Select value={groupData.idCarrera} onValueChange={handleChange} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent>
                  {carreras.map((carrera) => (
                    <SelectItem key={carrera.id} value={carrera.id}>
                      {carrera.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label>Descripcion</Label>
              <Textarea value={groupData.description} onChange={handleChange} placeholder="busco grupo de estudio para..." required />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label>Privacidad</Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Grupo abierto</SelectItem>
                  <SelectItem value="closed">Grupo cerrado</SelectItem>
                  {/* <SelectItem value="private">Grupo privado</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch checked={memberLimitChecked} onCheckedChange={setMemberLimitChecked} />
              <Label>Limitar miembros</Label>
            </div>

            {memberLimitChecked ? (
              <div className="grid w-full items-center gap-1.5">
                <Label>Limite</Label>
                <Input type="number" placeholder="2" required />
              </div>
            ) : null}

            <div className="w-full">
              <Button className="w-full bg-gradient shadow" type="submit">
                <Plus />
                Crear
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateGroup;
