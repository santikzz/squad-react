import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Atom, ChevronLeft, ChevronRight, GraduationCap, Monitor, Sigma, Trees } from "lucide-react";
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
    // idCarrera: z.string({
    //   required_error: "Elije una carrera.",
    // }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

const RegisterPage = () => {

  const [loading, setLoading] = useState(false);
  // const [facultades, setFacultades] = useState([]);
  const [carreraId, setCarreraId] = useState(null);
  const [carreras, setCarreras] = useState(null);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { isLoggedIn } = useGlobalContext();

  const navigate = useNavigate();
  ring.register();

  // useEffect(() => {
  //   fetchFacultades();
  // }, []);

  // const fetchFacultades = async () => {
  //   const { data, error } = await api.fetchFacultades();
  //   if (data) {
  //     setFacultades(data);
  //     setCarreras(data[0]["carreras"]);
  //   } else {
  //     console.error(error);
  //   }
  // };

  const fetchCarreras = async (type) => {
    const { data, error } = await api.fetchCarrerasType(type);
    if (data) {
      setCarreras(data);
    }
  }

  const form = useForm({
    resolver: zodResolver(registerFormSchema)
  });

  const formRef = useRef(null);
  const { trigger, handleSubmit, formState } = form;

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log({ ...formData, idCarrera: carreraId });
    const { data, error } = await api.register({ ...formData, idCarrera: carreraId.toString() });
    if (data) {
      setLoading(false);
      setRegisterSuccess(true);
    } else {
      setError("Lo sentimos, ha ocurrido un error, intentalo de nuevo mas tarde");
      console.error(error);
    }
  }

  // const handleSelectFacultad = (idFacultad) => {
  //   setCarreras(facultades[idFacultad]["carreras"]);
  // };

  const headTitles = ['Crea tu cuenta', 'Elije tu carrera', 'Elije tu carrera', 'Verifica tus datos'];
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Adjust based on the number of steps you want

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSetTipoCarrera = (type) => {
    fetchCarreras(type);
    nextStep();
  }

  const handleSelectCarreraId = (carrera) => {
    setCarreraId(carrera?.id);
    setSelectedCarrera(carrera?.name);
    nextStep();
  }

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


      <div className="absolute w-full flex flex-col items-center justify-center pt-20 pb-4 gap-2 z-10">
        <Label className="text-4xl font-satoshi-bold">{headTitles[currentStep - 1]}</Label>
        <Link to="/login" className="text-blue-500 font-satoshi-medium">o Iniciar Sesion</Link>
      </div>

      <div className="login-form flex overflow-hidden relative w-full h-screen">

        <div
          className={`transform transition-transform duration-500 ease-in-out w-full flex`}
          style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
        >

          <div className="w-full flex-shrink-0 p-8 flex flex-col items-center mt-[40%] lg:mt-[10%] lg:px-[600px] gap-6">
            <Form {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
              </form>
            </Form>

            <Button
              onClick={nextStep}
              className={`h-[50px] shadow-sm w-full flex gap-1 font-satoshi-bold`}
            >
              Continuar
              <ChevronRight size="20" />
            </Button>

          </div> {/* end step 1 */}

          <div className="w-full flex-shrink-0 p-8 flex flex-col items-center mt-[40%] lg:mt-[10%] lg:px-[500px]">

            <div className="flex flex-col w-full h-full gap-6 mb-12">

              <button
                onClick={() => { handleSetTipoCarrera('informatica') }}
                className="relative bg-white rounded-lg flex flex-row items-center px-6 gap-4 flex-1 shadow-lg active:brightness-75"
              >
                <div className="absolute bg-red-500 left-0 top-0 bottom-0 w-2 rounded-l-lg" />
                <Monitor size={48} />
                <label className="font-satoshi-medium text-2xl">Informática</label>
              </button>

              <button
                onClick={() => { handleSetTipoCarrera('matematica') }}
                className="relative bg-white rounded-lg flex flex-row items-center px-6 gap-4 flex-1 shadow-lg active:brightness-75"
              >
                <div className="absolute bg-blue-500 left-0 top-0 bottom-0 w-2 rounded-l-lg" />
                <Sigma size={48} />
                <label className="font-satoshi-medium text-2xl">Matemáticas</label>
              </button>

              <button
                onClick={() => { handleSetTipoCarrera('fisica') }}
                className="relative bg-white rounded-lg flex flex-row items-center px-6 gap-4 flex-1 shadow-lg active:brightness-75"
              >
                <div className="absolute bg-purple-500 left-0 top-0 bottom-0 w-2 rounded-l-lg" />
                <Atom size={48} />
                <label className="font-satoshi-medium text-2xl">Física</label>
              </button>

              <button
                onClick={() => { handleSetTipoCarrera('ambiental') }}
                className="relative bg-white rounded-lg flex flex-row items-center px-6 gap-4 flex-1 shadow-lg active:brightness-75"
              >
                <div className="absolute bg-green-500 left-0 top-0 bottom-0 w-2 rounded-l-lg" />
                <Trees size={48} />
                <label className="font-satoshi-medium text-2xl">Ambiental</label>
              </button>

              <button
                onClick={() => { handleSetTipoCarrera('posgrado') }}
                className="relative bg-white rounded-lg flex flex-row items-center px-6 gap-4 flex-1 shadow-lg active:brightness-75"
              >
                <div className="absolute bg-yellow-500 left-0 top-0 bottom-0 w-2 rounded-l-lg" />
                <GraduationCap size={48} />
                <label className="font-satoshi-medium text-2xl">Posgrado</label>
              </button>

            </div >

            <div className="flex flex-row justify-between gap-4 w-full">
              <Button
                onClick={prevStep}
                className={`h-[50px] shadow-sm w-full flex gap-1 font-satoshi-bold flex-1`}
              >
                <ChevronLeft size="20" />
                Atras
              </Button>
            </div>

          </div > {/*end step 2*/}


          <div className="w-full flex-shrink-0 p-8 flex flex-col items-center mt-[40%] lg:mt-[10%] lg:px-[500px] gap-4">

            <div className="flex flex-col w-full shadow-md rounded-b-lg border-b-[0.5px]">

              {carreras?.map((carrera, idx) => (
                <button
                  onClick={() => handleSelectCarreraId(carrera)}
                  className="py-4 px-3 border-b-[0.5px] active:brightness-75 bg-white last-of-type:border-none last-of-type:rounded-b-lg first-of-type:rounded-t-lg"
                  key={idx}
                >
                  <label className="font-satoshi-medium text-base">{carrera?.name}</label>
                </button>
              ))}
            </div>

            <div className="flex flex-row justify-between gap-4 w-full">
              <Button
                onClick={prevStep}
                className={`h-[50px] shadow-sm w-full flex gap-1 font-satoshi-bold flex-1`}
              >
                <ChevronLeft size="20" />
                Atras
              </Button>
            </div>

          </div> {/*end step 3*/}

          <div className="w-full flex-shrink-0 p-8 flex flex-col items-center mt-[40%] lg:mt-[10%] lg:px-[500px] gap-4">

            <div className="flex flex-col w-full">

              <div className="flex flex-row justify-between">
                <label className="font-satoshi-bold text-base">Nombre</label>
                <label className="font-satoshi-medium text-base" >{form.watch('name')}, {form.watch('surname')}</label>
              </div>

              <div className="flex flex-row justify-between">
                <label className="font-satoshi-bold text-base">Email</label>
                <label className="font-satoshi-medium text-base">{form.watch('email')}</label>
              </div>

              <div className="flex flex-row justify-between mt-4">
                <label className="font-satoshi-bold text-base">Carrera</label>
                <label className="font-satoshi-medium text-base text-right">{selectedCarrera}, Exactas</label>
              </div>

            </div>

            <div className="flex flex-row justify-between gap-4 w-full mt-6">
              <Button
                onClick={prevStep}
                className={`h-[50px] shadow-sm w-full flex gap-1 font-satoshi-bold flex-1`}
              >
                <ChevronLeft size="20" />
                Atras
              </Button>
              <Button
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.dispatchEvent(
                      new Event('submit', { cancelable: true, bubbles: true })
                    );
                  }
                }}
                className={`h-[50px] shadow-sm w-full flex gap-1 font-satoshi-bold flex-1 bg-gradient`}
              >
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

          </div> {/*end step 4*/}


        </div > {/* end slider */}

      </div > {/* end main wrapper */}

    </>
  );
};

export default RegisterPage;
