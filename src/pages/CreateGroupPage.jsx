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
import ButtonLoader from "@/components/ButtonLoader";
import Wrapper from "@/components/Wrapper";
import CreateGroupCard from "@/components/CreateGroupCard";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Escribe un titulo.",
    })
    .min(8, {
      message: "Titulo debe tener al menos 12 caracteres.",
    }).max(256, {
      message: "Maximo 256 caracteres",
    }),
  description: z
    .string({
      required_error: "Escribe una descripcion.",
    })
    .min(8, {
      message: "Descripcion debe tener al menos 12 caracteres.",
    }).max(1024, {
      message: "Maximo 1024 caracteres",
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
    <Wrapper>
      <div className="w-full flex justify-center pt-5">
        <Label className="text-2xl font-satoshi-bold">Nuevo grupo</Label>
      </div>
      <CreateGroupCard />
    </Wrapper>
  );
};

export default CreateGroupPage;
