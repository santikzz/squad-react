import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LogIn } from "lucide-react";
import { ring } from "ldrs";

const Login = () => {
  const [userdata, setUserdata] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  ring.register();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://squad.ddns.net/api/v1/login", userdata, { "Content-Type": "application/json" });
      if (response.status === 200) {
        const { token, ulid } = response.data;
        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", ulid);
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", ulid);
        }
        navigate("/");
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

  return (
    <div className="login-form h-screen w-full flex flex-col justify-center items-center">
      <div className="w-96 flex flex-col justify-center items-center">
        <img src="squad-logo-black.png" className="mb-4 w-full"></img>

        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle>¡Bienvenido de nuevo!</CardTitle>
            <CardDescription>
              ¿Aun no tienes una cuenta?
              <Link className="text-blue-500 ml-1" href="/register">
                Registrate
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Email</Label>
              <Input type="text" className={`${error ? "outline outline-1 outline-red-600" : null} `} name="email" value={userdata.email} onChange={handleInputChange} id="email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Contraseña</Label>
              <Input type="password" className={`${error ? "outline outline-1 outline-red-600" : null} `} name="password" value={userdata.password} onChange={handleInputChange} id="password" />
            </div>
            {error ? (
              <div className="flex w-full justify-center gap-1.5">
                <Label className="text-red-600">Usuario y/o contraseña invalidos</Label>
              </div>
            ) : null}
            <div className="flex flex-row justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked)} />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Recuerdame</Label>
              </div>
              <Link className="text-blue-500 text-sm" href="#">
                Olvidaste tu contraseña?
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button className={`w-full flex gap-1.5 ${loading ? "brightness-150" : null}`} onClick={handleLogin}>
              {!loading ? (
                <>
                  <LogIn size="20" />
                  Iniciar Sesion
                </>
              ) : (
                <l-ring size="20" stroke="3" bg-opacity="0" speed="2" color="gray"></l-ring>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
