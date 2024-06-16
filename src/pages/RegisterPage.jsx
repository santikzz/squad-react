import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/components/services/Api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LogIn, ChevronRight, ChevronLeft } from "lucide-react";
import { ring } from "ldrs";

import assets from "@/Assets";
// import squadLogo from "/squad-logo-black.png";

const userdataFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Ingresa tu email.",
      })
      .email(),
    name: z
      .string({
        required_error: "Ingresa tu nombre.",
      })
      .min(4, { message: "Minimo 4 caracteres" })
      .max(32, { message: "Maximo 32 caracteres" }),
    surname: z
      .string({
        required_error: "Ingresa tu nombre.",
      })
      .min(4, { message: "Minimo 4 caracteres" })
      .max(32, { message: "Maximo 32 caracteres" }),
    password: z.string({ required_error: "Ingresa una contraseña." }).min(8, { message: "Minimo 8 caracteres" }),
    // .regex(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { message: "Contraseña invalida" }),
    password_confirmation: z.string({ required_error: "Repite la contraseña." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

const userdataStep2FromSchema = z.object({
  // idFacultad: z.string({
  //   required_error: "Elije una facultad.",
  // }),
  idCarrera: z.string({
    required_error: "Elije una carrera.",
  }),
});

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [userdata, setUserdata] = useState();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [formStyle, setFormStyle] = useState({ transition: "0.25s", transform: "translateX(0%)" });

  const navigate = useNavigate();
  ring.register();

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
    fetchFacultades();
  }, []);

  const onSubmitStep1 = async (step1userdata) => {
    // console.log(step1userdata);
    setUserdata(step1userdata);

    setFormStyle({ ...formStyle, transform: "translateX(-300%)" });
  };

  const onSubmitStep2 = async (step2userdata) => {
    setLoading(true);
    const data = { ...userdata, ["idCarrera"]: step2userdata["idCarrera"] };
    try {
      const response = await api.post("/register", userdata);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        setRegisterSuccess(true);
      }
    } catch (error) {
      setError("Lo sentimos, ha ocurrido un error, intentalo de nuevo mas tarde");
      console.log(error);
    }
  };

  const handleGoBack = () => {
    setFormStyle({ ...formStyle, transform: "translateX(0%)" });
  };

  const handleSelectFacultad = (idFacultad) => {
    setCarreras(facultades[idFacultad]["carreras"]);
  };

  const userdataForm = useForm({
    resolver: zodResolver(userdataFormSchema),
    defaultValues: {},
  });

  const userdataStep2Form = useForm({
    resolver: zodResolver(userdataStep2FromSchema),
    defaultValues: {
      // idFacultad: "-1",
      // idCarrera: "-1",
    },
  });

  return (
    <>
      <AlertDialog open={registerSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Felicidades!</AlertDialogTitle>
            <AlertDialogDescription>Ya tienes tu cuenta de SQUAD</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/login")}>Iniciar Sesion</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="login-form h-screen w-full flex flex-col items-center overflow-x-hidden">

        <div className="w-96 h-full flex flex-col items-center">
          {/* <img src={assets.logo1_black} className="mb-4 w-full"></img> */}

          <div className="flex flex-col items-center justify-center pt-20 pb-4 gap-2">
            <Label className="text-4xl">Crea tu cuenta</Label>
            <Link to="/login" className="text-blue-500">o Iniciar Sesion</Link>
          </div>

          <div className="h-full flex flex-row items-center" style={formStyle}>

            <div className="min-w-full h-full py-6" style={{ marginRight: "200%" }} >

              <Form {...userdataForm}>
                <form onSubmit={userdataForm.handleSubmit(onSubmitStep1)} className="h-full flex flex-col justify-between">

                  <div className="flex flex-col gap-3">

                    <FormField
                      control={userdataForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={userdataForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Apellido *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={userdataForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña *</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormDescription>Minimo 8 caracters, un mayuscula y un numero</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={userdataForm.control}
                      name="password_confirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repite la contraseña *</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>

                  <div className="flex">
                    <Button type="submit" className={`w-full flex gap-1 h-[50px] text-base bg-black`}>
                      <ChevronRight size="20" />
                      Continuar
                    </Button>
                  </div>

                </form>
              </Form>

            </div>

            <div className="min-w-full h-full py-6">

              <div className="flex flex-col h-full">

                <Form {...userdataStep2Form}>
                  <form onSubmit={userdataStep2Form.handleSubmit(onSubmitStep2)} className="h-full flex flex-col justify-between">
                    <div className="w-full flex flex-col gap-3">
                      <FormField
                        control={userdataStep2Form.control}
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
                        control={userdataStep2Form.control}
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


                    <div className="flex flex-row justify-between gap-6">

                      <Button variant="outline" className="flex items-center shadow-sm h-[50px] w-full" onClick={handleGoBack}>
                        <ChevronLeft size="25" /> Atras
                      </Button>

                      <Button type="submit" className={`h-[50px] bg-gradient shadow-sm w-full flex gap-1 ${loading ? "brightness-80" : null}`}>

                        {!loading ? (
                          <>
                            Registrarse
                            <ChevronRight size="20" />
                          </>
                        ) : (
                          <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
                        )}
                      </Button>
                    </div>

                  </form>
                </Form>

              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default RegisterPage;
