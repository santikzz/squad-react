import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { ring } from "ldrs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "@/components/Loader";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import InputNumber from "@/components/InputNumber";
import OptionSwitch from "@/components/OptionSwitch";
import ButtonLoader from "@/components/ButtonLoader";

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

const CreateGroupCard = () => {

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
            {!environment ? (<Loader />) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-4 gap-4">
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

                            <ButtonLoader isLoading={creating} type="submit">
                                <Plus /> Crear
                            </ButtonLoader>

                        </div>
                    </form>
                </Form>
            )}
        </>
    );
};

export default CreateGroupCard;
