import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Square, ChevronLeft, SendHorizontal, EyeOff } from "lucide-react";
import { ring } from "ldrs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Navbar from "@/components/Navbar";
import "../App.css";
import assets from "@/Assets";
import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";

const FormSchema = z.object({
  description: z
    .string({
      required_error: "Escribe algo",
    }).min(12, {
      message: "Minimo 12 caracteres",
    })
});

const FeedbackPage = () => {

  const [sendSuccess, setSendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useGlobalContext();
  const navigate = useNavigate();
  ring.register();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (message) => {
    setLoading(true);
    const { data, error } = await api.sendFeedback(message)
    if (data) {
      setSendSuccess(true);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
        <img src={assets.logo1_white} className="h-full" />
        <Square color="transparent" />
      </Navbar>

      <AlertDialog open={sendSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-satoshi-bold">¡Feedback Enviado!</AlertDialogTitle>
            <AlertDialogDescription className="font-satoshi-medium">Muchas gracias por tu aporte :)</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="font-satoshi-medium" onClick={() => navigate("/")}>Volver</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <div className="h-full w-full flex flex-col justify-between p-4 gap-4">
            <Label className="text-lg text-center font-satoshi-bold">Dejanos tu sugerencia o reporta un Bug</Label>


            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <Textarea
                      placeholder="Escribe algo aqui..."
                      className="resize-none min-h-96 shadow-sm font-satoshi-medium text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Label className="font-normal text-sm text-justify text-gray-500 font-satoshi-medium">En caso de reportar un bug/problema, por favor, sea lo más detallado y explícito posible en su descripción. Incluya un paso a paso claro y preciso sobre cómo reproducir el problema o cómo llegó a experimentarlo.</Label>

            <Button type="submit" className="shadow-sm py-6">
              {!loading ? (
                <div className="flex flex-row items-center gap-1">
                  <SendHorizontal size="16" />
                  <Label className="text-white font-satoshi-bold text-base">Enviar</Label>
                </div>
              ) : (
                <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
              )}
            </Button>
            {/* <Label className="text-sm text-stone-400 font-normal flex items-center gap-1"><EyeOff size="10" />No te preocupes, tu mensaje es anonimo.</Label> */}
          </div>

        </form>
      </Form>

    </>
  );
};

export default FeedbackPage;
