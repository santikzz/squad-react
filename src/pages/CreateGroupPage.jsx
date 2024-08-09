import React, { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Square, Lock, LockOpen, ChevronLeft, Plus } from "lucide-react";
import { ring } from "ldrs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import assets from "@/Assets";
import InputNumber from "@/components/InputNumber";
import OptionSwitch from "@/components/OptionSwitch";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Escribe un titulo.",
    })
    .min(12, {
      message: "Titulo debe tener al menos 12 caracteres.",
    }),
  description: z
    .string({
      required_error: "Escribe una descripcion.",
    })
    .min(12, {
      message: "Descripcion debe tener al menos 12 caracteres.",
    }),
  privacy: z.string(),
  maxMembers: z.number().min(0).max(20),
});

const CreateGroupPage = () => {

  const [environment, setEnvironment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();
  ring.register();

  const fetchEnvironment = async () => {
    const { data, error } = await api.fetchEnvironment()
    if (data) {
      setEnvironment(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEnvironment();
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      maxMembers: 0,
      privacy: 'open'
    },
  });

  const onSubmit = async (formData) => {
    setCreating(true);
    const { data, error } = await api.createGroup(formData)
    if (data) {
      setCreating(false);
      navigate(`/group/${data.ulid}`);
    } else {
      console.log(error);
    }
    // console.log(formData);
  };

  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <Navbar>
        <Link to="/" className="active:brightness-75">
          <ChevronLeft size="32" />
        </Link>
      </Navbar>

      {!environment ? (<Loader />) : (
        <>
          <div className="w-full flex justify-center pt-5">
            <Label className="text-2xl font-satoshi-bold">Nuevo grupo</Label>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 gap-4 lg:mx-[33%]">
              <div className="grid w-full items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-satoshi-bold text-base">Titulo</FormLabel>
                      <FormControl>
                        <Input className="font-satoshi-medium text-base" {...field} />
                      </FormControl>
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
                      <FormLabel className="font-satoshi-bold text-base">Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="busco grupo de estudio para..." className="resize-none font-satoshi-medium text-base" {...field} />
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
                      <FormLabel className="font-satoshi-bold text-base">Privacidad</FormLabel>
                      <FormControl>
                        <Controller
                          name="privacy"
                          control={form.control}
                          render={({ field }) => (
                            <OptionSwitch
                              value={field.value}
                              onChange={field.onChange}
                              optionA='open'
                              optionB='closed'
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <OptionSwitch></OptionSwitch> */}
              {/* <div className="flex items-center space-x-2">
                <Switch checked={memberLimitChecked} onCheckedChange={setMemberLimitChecked} />
                <Label>Limitar miembros</Label>
              </div> */}

              <div className={`grid w-full items-center gap-1.5 `}>
                <FormField
                  control={form.control}
                  name="maxMembers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-satoshi-bold text-base">Limite de miembros</FormLabel>
                      <FormControl>
                        <Controller
                          name="maxMembers"
                          control={form.control}
                          render={({ field }) => (
                            <InputNumber
                              value={field.value}
                              onChange={field.onChange}
                              min={0}
                              max={20}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full mt-16">
                <Button className="w-full bg-gradient shadow font-satoshi-bold text-base h-12" type="submit">
                  {!creating ? (
                    <>
                      <Plus />
                      Crear
                    </>
                  ) : (
                    <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </>)}
      <BottomNav environment={environment}></BottomNav>
    </>
  );
};

export default CreateGroupPage;
