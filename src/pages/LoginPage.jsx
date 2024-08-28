import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock } from "lucide-react";
import { ring } from "ldrs";

import { useGlobalContext } from "@/context/GlobalProvider";
import { api } from "@/components/services/Api";
import assets from "@/Assets";

const LoginPage = () => {
  const [userdata, setUserdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, isLoggedIn, setEnvironment, environment } = useGlobalContext();
  const navigate = useNavigate();
  ring.register();

  const handleLogin = async () => {
    setLoading(true);
    const { token, error } = await api.login(userdata);
    if (token) {
      localStorage.setItem("token", token);
      api.setAuthToken(token);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  if (isLoggedIn) return (<Navigate to="/" />);

  return (
    <div className="login-form h-screen w-full flex flex-col justify-center items-center bg-gray">

      <div className="w-96 flex flex-col justify-center items-center">

        <div className="w-40 flex justify-center">
          <img src={assets.splash_black} className="drop-shadow-md"></img>
        </div>

        <div className="flex flex-col w-full gap-2 mt-4">

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-base flex flex-row items-center gap-1.5 font-satoshi-bold"><Mail size="16" /> Email</Label>
            <Input variant="outline" type="text" className={`font-satoshi-medium border-[1px] border-gray-300 ${error ? "outline outline-2 outline-red-600" : null} `} name="email" value={userdata.email} onChange={handleInputChange} id="email" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-base flex flex-row items-center gap-1.5 font-satoshi-bold"><Lock size="16" /> Contraseña</Label>
            <Input variant="outline" type="password" className={`font-satoshi-medium border-[1px] border-gray-300 ${error ? "outline outline-2 outline-red-600" : null} `} name="password" value={userdata.password} onChange={handleInputChange} id="password" />
          </div>

        </div>

        {error ? (
          <div className="flex w-full justify-center gap-1.5 mt-4">
            <Label className="text-red-600 font-satoshi-bold">Usuario y/o contraseña invalidos</Label>
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

          <Button className={`w-full flex gap-1.5 text-base font-satoshi-bold bg-black ${loading ? "brightness-150" : null}`} onClick={handleLogin}>
            {!loading ? (
              <>
                <LogIn size="20" />
                Iniciar Sesion
              </>
            ) : (
              <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
            )}
          </Button>

          <Link className="text-blue-500 text-base font-satoshi-medium " href="#">
            Olvidaste tu contraseña?
          </Link>
          {/* 
          <Label className="">o</Label>

          <Button variant="outline" className="flex flex-row w-full gap-1.5 text-base items-center font-satoshi-bold">
            <img src={assets.icon_google} className="w-[20px]"></img>Continuar con Google
          </Button> */}

        </div>

        <div className="pt-6">
          <Label className="text-base font-satoshi-medium">¿Aun no tienes una cuenta? <Link className="text-blue-400 ml-1" to="/register">Registrate</Link> </Label>
        </div>

        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4">
          <label className="text-gray-400 font-satoshi-regular">BETA 0.24.06.27</label>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
