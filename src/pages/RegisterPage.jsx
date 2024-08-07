import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ring } from "ldrs";

import { useGlobalContext } from "@/context/GlobalProvider";
import { api } from "@/components/services/Api";

const registerFormSchema = z
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
    password: z
      .string({
        required_error: "Ingresa una contraseña."
      })
      .min(8, { message: "Minimo 8 caracteres" }),
    password_confirmation: z
      .string({
        required_error: "Repite la contraseña."
      }),
    idCarrera: z.string({
      required_error: "Elije una carrera.",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

const RegisterPage = () => {

  const [loading, setLoading] = useState(false);
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { isLoggedIn } = useGlobalContext();

  const navigate = useNavigate();
  ring.register();

  useEffect(() => {
    fetchFacultades();
  }, []);

  const fetchFacultades = async () => {
    const { data, error } = await api.fetchFacultades();
    if (data) {
      setFacultades(data);
      setCarreras(data[0]["carreras"]);
    } else {
      console.error(error);
    }
  };

  const form = useForm({
    resolver: zodResolver(registerFormSchema)
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    const { data, error } = await api.register(formData);
    if(data){
      setLoading(false);
      setRegisterSuccess(true);
    }else{
      setError("Lo sentimos, ha ocurrido un error, intentalo de nuevo mas tarde");
      console.error(error);
    }
  }

  const handleSelectFacultad = (idFacultad) => {
    setCarreras(facultades[idFacultad]["carreras"]);
  };

  if (isLoggedIn) return (<Navigate to="/" />);

  return (
    <>
      <AlertDialog open={registerSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-satoshi-bold">¡Felicidades!</AlertDialogTitle>
            <AlertDialogDescription className="font-satoshi-medium">Ya tienes tu cuenta de SQUAD</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="font-satoshi-bold" onClick={() => navigate("/login")}>Iniciar Sesion</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="login-form h-screen w-full flex flex-col">

        <div className="flex flex-col items-center justify-center pt-20 pb-4 gap-2">
          <Label className="text-4xl font-satoshi-bold">Crea tu cuenta</Label>
          <Link to="/login" className="text-blue-500 font-satoshi-medium">o Iniciar Sesion</Link>
        </div>

        <div className="w-full h-full flex justify-center px-6">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Email</FormLabel>
                    <FormControl>
                      <Input className="font-satoshi-medium" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Nombre</FormLabel>
                    <FormControl>
                      <Input className="font-satoshi-medium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Apellido</FormLabel>
                    <FormControl>
                      <Input className="font-satoshi-medium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Contraseña</FormLabel>
                    <FormControl>
                      <Input className="font-satoshi-medium" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Repita la contraseña</FormLabel>
                    <FormControl>
                      <Input className="font-satoshi-medium" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="id_facultad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Facultad</FormLabel>
                    <Select onValueChange={handleSelectFacultad} defaultValue="">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="font-satoshi-medium" placeholder="Selecciona una facultad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {facultades.map((facultad, idx) => (
                          <SelectItem className="font-satoshi-medium" key={idx} value={idx.toString()}>
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
                control={form.control}
                name="idCarrera"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-satoshi-bold">Carrera</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue="">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="font-satoshi-medium" placeholder="Selecciona una carrera" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {carreras.map((carrera) => (
                          <SelectItem className="font-satoshi-medium" key={carrera.id} value={carrera.id.toString()}>
                            {carrera.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={`h-[50px] shadow-sm w-full flex gap-1 font-satoshi-bold ${loading ? "brightness-80" : null}`}>
                {!loading ? (
                  <>
                    Registrarse
                    <ChevronRight size="20" />
                  </>
                ) : (
                  <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
                )}
              </Button>

            </form>
          </Form>

        </div>

      </div>

    </>
  );
};

export default RegisterPage;
