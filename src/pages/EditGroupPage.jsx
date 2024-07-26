import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Square, Lock, LockOpen, ChevronLeft, Plus } from "lucide-react";
import { ring } from "ldrs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import { z } from "zod";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import BottomNav from "@/components/BottomNav";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import assets from "@/Assets";
import InputNumber from "@/components/InputNumber";
import OptionSwitch from "@/components/OptionSwitch";

const groupFormSchema = z.object({
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
    privacy: z.string({
        required_error: "Elije un modo de privacidad",
    }),
    maxMembers: z.number().min(0).max(20),
});

const EditGroupPage = () => {

    const { groupId } = useParams();
    const [environment, setEnvironment] = useState(null);
    const [group, setGroup] = useState(null);
    const [memberLimitChecked, setMemberLimitChecked] = useState(false);
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


    const fetchGroupData = async () => {

        const { data, error } = await api.fetchGroup(groupId)
        if (data) {
            setGroup(data);
            form.reset({
                title: data.title,
                description: data.description,
                privacy: data.privacy,
                maxMembers: data.maxMembers || 0,
            });
        } else {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchEnvironment();
        fetchGroupData();
    }, []);

    const form = useForm({
        resolver: zodResolver(groupFormSchema),
    });

    const onSubmit = async (groupData) => {
        // console.log(groupData, memberLimitChecked);

        setCreating(true);

        try {
            const response = await api.put(`/groups/${groupId}`, groupData);
            console.log(response);

            if (response.status === 200) {
                setCreating(false);
                navigate(`/group/${response.data.ulid}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!isLoggedIn) return (<Navigate to="/login" />);
    if (!environment || !group) return (<Loader />);

    return (
        <>
            <Navbar>
                <Link to="/" className="active:brightness-75">
                    <ChevronLeft size="32" />
                </Link>
                <img src={assets.logo1_white} className="h-full"></img>
                <Square color="transparent" />
            </Navbar>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full flex justify-center pt-5">
                        <Label className="text-2xl font-satoshi-bold">Editar Grupo</Label>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 gap-7 lg:mx-[33%]">
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
                                                <Textarea className="font-satoshi-medium text-base resize-none" placeholder="busco grupo de estudio para..." {...field} />
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
                                                            max={100}
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
                                            Editar
                                        </>
                                    ) : (
                                        <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </>
            )}
            <BottomNav environment={environment}></BottomNav>
        </>
    );
};

export default EditGroupPage;
