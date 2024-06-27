import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/components/services/Api";

import assets from "@/Assets";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LogIn, Mail, Lock } from "lucide-react";
import { ring } from "ldrs";

const LoginPage = ({ isLoggedIn }) => {
  const [userdata, setUserdata] = useState({});
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  ring.register();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post("login", userdata);
      if (response.status === 200) {
        const { token } = response.data;

        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("userdata", JSON.stringify(response.data));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userdata", JSON.stringify(response.data));
        }
        // navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <div className="login-form h-screen w-full flex flex-col justify-center items-center bg-gray">

      <div className="w-96 flex flex-col justify-center items-center">

        <div className="w-32 flex justify-center">
          <img src={assets.splash_black} className="drop-shadow-md"></img>
        </div>

        <div className="flex flex-col w-full gap-2 mt-4">

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-base flex flex-row items-center gap-1.5"><Mail size="16"/> Email</Label>
            <Input variant="outline" type="text" className={`border-[1px] border-gray-300 ${error ? "outline outline-2 outline-red-600" : null} `} name="email" value={userdata.email} onChange={handleInputChange} id="email" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-base flex flex-row items-center gap-1.5"><Lock size="16"/> Contraseña</Label>
            <Input variant="outline" type="password" className={`border-[1px] border-gray-300 ${error ? "outline outline-2 outline-red-600" : null} `} name="password" value={userdata.password} onChange={handleInputChange} id="password" />
          </div>

        </div>

        {error ? (
          <div className="flex w-full justify-center gap-1.5 mt-4">
            <Label className="text-red-600">Usuario y/o contraseña invalidos</Label>
          </div>
        ) : null}

        {/* <div className="flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked)} />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Recuerdame</Label>
          </div>
          <Link className="text-blue-500 text-sm" href="#">
            Olvidaste tu contraseña?
          </Link>
        </div> */}


        <div className="flex flex-col w-full gap-3 items-center mt-4">

          <Button className={`w-full flex gap-1.5 text-base bg-black ${loading ? "brightness-150" : null}`} onClick={handleLogin}>
            {!loading ? (
              <>
                <LogIn size="20" />
                Iniciar Sesion
              </>
            ) : (
              <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
            )}
          </Button>

          <Label className="">o</Label>

          <Button variant="outline" className="flex flex-row w-full gap-1.5 text-base items-center">
            <img src={assets.icon_google} className="w-[20px]"></img>Continuar con Google
          </Button>

        </div>

        <div className="pt-6">
          <Label className="text-base ">¿Aun no tienes una cuenta? <Link className="text-blue-400 ml-1" to="/register">Registrate</Link> </Label>
        </div>

        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-2">
          <label className="text-gray-400" style={{fontFamily: "consolas"}}>BETA 0.24.06.27</label>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
