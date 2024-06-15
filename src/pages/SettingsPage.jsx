import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Square, ChevronLeft, Settings } from "lucide-react";

import "../App.css";
import assets from "@/Assets";
// import squadLogo from "/squad-logo-white.png";

const SettingsPage = ({ currentuser }) => {
  return (
    <>
      <Navbar>
        <Link to="/">
          <ChevronLeft size="32" strokeWidth="2" />
        </Link>
        <img src={assets.logo1_white} className="h-full" />
        <Square color="transparent" />
      </Navbar>

      <div className="h-full w-full flex flex-col justify-between pt-8 gap-4 px-4">
        <div className="flex flex-col items-center">
          <Label className="text-center flex gap-1 items-center text-3xl text-stone-800">
            <Settings /> Opciones
          </Label>
        </div>

        <Card className="pt-4 bg-stone-50">
          <CardContent className="flex flex-col gap-8">
            {[...Array(8)].map((e, i) => (
              <div className="flex items-center justify-between">
                <Switch />
                <Label className="text-lg">This is a toggle option</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="py-6">Guardar</Button>
      </div>
    </>
  );
};

export default SettingsPage;
