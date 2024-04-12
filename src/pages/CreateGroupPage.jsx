import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "@/components/services/Api";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { Square, Lock, LockOpen, ChevronLeft, Plus } from "lucide-react";

import squadLogo from "/squad-logo-white.png";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Escribe un titulo.",
    })
    .min(12, {
      message: "Titulo debe tener al menos 12 caracteres.",
    }),
  // facultad: z.string({
  //   required_error: "Elije una facultad.",
  // }),
  idCarrera: z.string({
    required_error: "Elije una carrera.",
  }),
  description: z
    .string({
      required_error: "Escribe una descripcion.",
    })
    .min(12, {
      message: "Descripcion debe tener al menos 12 caracteres.",
    }),
  privacy: z.string({
    required_error: "Elije un modo de privacidad",
  }),
  maxMembers: z.string().optional(),
});

const CreateGroupPage = () => {
  // const [groupData, setGroupData] = useState({
  //   title: "",
  //   description: "",
  //   privacy: "open",
  //   maxMembers: 0,
  //   idCarrera: 0,
  //   tags: ["none"], // temporarely voided
  // });

  const [facultades, setFacultades] = useState([]);
  // const [selectedFacultad, setSelectedFacultad] = useState(0);
  const [carreras, setCarreras] = useState([]);
  const [memberLimitChecked, setMemberLimitChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const response = await api.get("/facultades");

        // console.log(response);

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

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setGroupData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleTagChange = (newTags) => {
  //   setGroupData((prevData) => ({
  //     ...prevData,
  //     tags: newTags,
  //   }));
  // };

  const handleSelectFacultad = (idFacultad) => {
    setCarreras(facultades[idFacultad]["carreras"]);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // title: "",
      // description: "",
      // privacy: "",
      // maxMembers: 2,
    },
  });

  const onSubmit = async (groupData) => {
    console.log(groupData, memberLimitChecked);

    groupData = { ...groupData, 
      ["maxMembers"]: memberLimitChecked ? parseInt(groupData["maxMembers"]) : null,
      ["idCarrera"]: parseInt(groupData["idCarrera"]),
      ["tags"]: ["none"],
     };

    try {
      const response = await api.post("/groups", groupData);
      console.log(response);

      if (response.status === 200) {
        navigate(`/group/${response.data.ulid}`);
      }
    } catch (error) {
      console.log(error);
    }
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 gap-7 lg:mx-[33%]">
              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="facultad"
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
              </div>

              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
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
              </div>

              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="busco grupo de estudio para..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Privacidad</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Grupo abierto</SelectItem>
                          <SelectItem value="closed">Grupo cerrado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch checked={memberLimitChecked} onCheckedChange={setMemberLimitChecked} />
                <Label>Limitar miembros</Label>
              </div>

              {memberLimitChecked ? (
                <div className={`grid w-full items-center gap-1.5 ${!memberLimitChecked ? "hidden" : null}`}>
                  <FormField
                    control={form.control}
                    name="maxMembers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limite</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              <div className="w-full">
                <Button className="w-full bg-gradient shadow" type="submit">
                  <Plus />
                  Crear
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default CreateGroupPage;
