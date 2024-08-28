import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Square, ChevronLeft, Settings, Save, ImageUp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormatTimeAgo } from "@/components/services/Utils";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import "../App.css";
import assets from "@/Assets";

const userdataSchema = z.object({
  name: z.string({
    required_error: "Este campo es requerido",
  }).min(1),
  surname: z.string({
    required_error: "Este campo es requerido",
  }).min(1),
  about: z.string(),
  idCarrera: z.string().optional(),
});

const SettingsPage = () => {

  const [environment, setEnvironment] = useState(null);
  const [userdata, setUserdata] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoggedIn } = useGlobalContext();

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
  }

  const fetchUserdata = async () => {
    const { data, error } = await api.fetchUserdata();
    if (data) {
      setUserdata(data);

      userdataForm.reset({
        name: data.name,
        surname: data.surname,
        about: data.about,
        // idCarrera: data.idCarrera,
      });
    }
  }

  useEffect(() => {
    // fetchFacultades();
    fetchEnvironment();
    fetchUserdata();
  }, []);

  // const handleSelectFacultad = (idFacultad) => {
  //   setCarreras(facultades[idFacultad]["carreras"]);
  // };

  const handleSubmit = async (formData) => {
    console.log(formData);
    const { data, error } = await api.updateUserSettings(formData);
    if (data) {
      alert('updated');
    }
    console.log(data, error);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const fileFormData = new FormData();
      fileFormData.append('avatar', selectedFile);
      const response = await api.updateUserAvatar(fileFormData);
      if (response) {
        alert('uploaded!');
      }
    }
  }

  const userdataForm = useForm({
    resolver: zodResolver(userdataSchema),
    defaultValues: {
      name: userdata.name,
      surname: userdata.surname,
      about: userdata.about,
      // idCarrera: userdata.idCarrera,
    },
  });

  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
      </Navbar>

      {(!environment || !userdata) ? <Loader /> : (

        <div className="h-screen w-full flex flex-col p-4">

          <div className="flex flex-col gap-4">
            {/* 
            <div className="flex flex-col">
              <Label className="flex gap-1 items-center text-2xl text-stone-800">
                <Settings /> Opciones
              </Label>
            </div> */}

            <div className="flex flex-col w-full items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={api.API_URL + userdata.avatar} alt="profile" />
                <AvatarFallback className="text-stone-900">{userdata.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1.5">
                <Label className="font-satoshi-bold">Subir foto de perfil</Label>
                <form onSubmit={handleSubmitFile} className="flex flex-row gap-2 w-full">
                  <Input type="file" onChange={handleFileChange} variant="outline" className="flex gap-1.5 items-center font-satoshi-medium" />
                  <Button type="submit" className="flex flex-row gap-1.5 font-satoshi-bold"><ImageUp size="20" />Subir</Button>
                </form>
              </div>
            </div>

            <Form {...userdataForm}>
              <form onSubmit={userdataForm.handleSubmit(handleSubmit)} className="h-full flex flex-col justify-between">
                <div className="w-full flex flex-col gap-3">

                  <FormField
                    control={userdataForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-satoshi-bold">Nombre</FormLabel>
                        <FormControl>
                          <Input className="font-satoshi-medium" placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={userdataForm.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-satoshi-bold">Apellido</FormLabel>
                        <FormControl>
                          <Input className="font-satoshi-medium" placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={userdataForm.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-satoshi-bold">Sobre ti</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escribe algo sobre ti..."
                            className="font-satoshi-medium"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <Separator className="mt-4" />
              
                  <FormField
                    control={userdataForm.control}
                    name="idFacultad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-satoshi-bold">Facultad</FormLabel>
                        <Select onValueChange={handleSelectFacultad} value={field.value} defaultValue="">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una facultad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {facultades.map((facultad, idx) => (
                              <SelectItem key={idx} value={idx.toString()}>
                                {facultad.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Solo elija si quiere cambiar de facultad o carrera
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={userdataForm.control}
                    name="idCarrera"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-satoshi-bold">Carrera</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una carrera" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {carreras.map((carrera) => (
                              <SelectItem key={carrera.id} value={carrera.id.toString()}>
                                {carrera.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                <div className="flex flex-row w-full pt-6">
                  <Button className="py-6 w-full text-base flex gap-1.5 font-satoshi-bold bg-gradient"><Save size="20" />Guardar</Button>
                </div>

              </form>
            </Form>

          </div>

        </div>

      )}

      <BottomNav environment={environment}></BottomNav>
    </>
  );
};

export default SettingsPage;