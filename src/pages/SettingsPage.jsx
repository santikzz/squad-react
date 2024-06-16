import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import api from "@/components/services/Api";
import { UsernameAvatarFallout, FormatTimeAgo } from "@/components/services/Utils";

import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Square, ChevronLeft, Settings, Save, ImageUp } from "lucide-react";

import "../App.css";
import assets from "@/Assets";
// import squadLogo from "/squad-logo-white.png";

const userconfigFormSchema = z.object({
  // idFacultad: z.string({
  //   required_error: "Elije una facultad.",
  // }),
  idCarrera: z.string({
    required_error: "Elije una carrera.",
  }),
});

const SettingsPage = ({ currentuser }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [userdata, setUserdata] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const response = await api.get("/facultades");

        console.log(response);

        if (response.status === 200) {
          setFacultades(response.data);
          setCarreras(response.data[0]["carreras"]);
          // setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserdata = async () => {
      try {
        const response = await api.get("/user");

        console.log(response);

        if (response.status === 200) {
          setUserdata(response.data);
          // setCarreras(response.data[0]["carreras"]);
          // setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFacultades();
    fetchUserdata();

  }, []);

  const handleSelectFacultad = (idFacultad) => {
    setCarreras(facultades[idFacultad]["carreras"]);
  };

  const editUserconfigForm = useForm({
    resolver: zodResolver(userconfigFormSchema),
    defaultValues: {
      // idFacultad: "-1",
      // idCarrera: "-1",
    },
  });

  const handleConfigSubmit = async (step2userdata) => {
    console.log("lol");
  };

  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
        <img src={assets.logo1_white} className="h-full" />
        <Square color="transparent" />
      </Navbar>

      <div className="h-screen w-full flex flex-col p-4">

        {/* {[...Array(8)].map((e, i) => (
              <div className="flex items-center justify-between">
              <Switch />
              <Label className="text-lg">This is a toggle option</Label>
              </div>
              ))} */}

        <div className="flex flex-col gap-4">

          <div className="flex flex-col">
            <Label className="flex gap-1 items-center text-2xl text-stone-800">
              <Settings /> Opciones
            </Label>
          </div>

          <div className="flex flex-col w-full items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" alt="profile" />
              <AvatarFallback className="text-stone-900">{UsernameAvatarFallout(currentuser.name, currentuser.surname)}</AvatarFallback>
            </Avatar>

            <Button variant="outline" className="flex gap-1.5 items-center"><ImageUp size="20"/> Subir Foto</Button>
          </div>

          <Form {...editUserconfigForm}>
            <form onSubmit={editUserconfigForm.handleSubmit(handleConfigSubmit)} className="h-full flex flex-col justify-between">
              <div className="w-full flex flex-col gap-3">


                <FormField
                  control={editUserconfigForm.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editUserconfigForm.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editUserconfigForm.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobre ti</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe algo..."
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="mt-4" />

                <FormField
                  control={editUserconfigForm.control}
                  name="idfacultad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facultad</FormLabel>
                      <Select onValueChange={handleSelectFacultad} value={field.value} defaultValue="">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="--" />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editUserconfigForm.control}
                  name="idCarrera"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carrera</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="--" />
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
                />
                {error ? <Label className="text-center text-red-600">{error}</Label> : null}
              </div>

            </form>
          </Form>

          <div className="flex flex-row w-full">
            <Button className="py-6 w-full text-base flex gap-1.5"><Save size="20" />Guardar</Button>
          </div>

        </div>




      </div>

    </>
  );
};

export default SettingsPage;
