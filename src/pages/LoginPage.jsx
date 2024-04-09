import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// import { login as apiLogin } from "@/app/services/api";
// import { setUserdata as setAuthUserdata } from "../app/services/auth";
import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// import "@/app/globals.css";
// import "@/app/styles/page.scss";

const Login = () => {
  // const router = useRouter();

  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    // event.preventDefault();

    try {
      const response = await apiLogin(userdata);
      const data = await response.json();
      if (response.ok) {
        setAuthUserdata(data, rememberMe);
        console.log(JSON.stringify(data));
        router.push("/home");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  return (
    <>
      <div className="login-form h-screen w-full flex flex-col justify-center items-center">
        <div className="w-96 flex flex-col justify-center items-center">
          <img src="squad-logo-black.png" className="mb-4 w-full"></img>

          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Log in to continue</CardTitle>
              <CardDescription>
                ¿Don't have an account?
                <Link className="text-blue-500 ml-1" href="/register">
                  Register
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
              </div>
              <Input type="text" className={`${error ? "outline outline-1 outline-red-600" : null} `} name="username" value={userdata.username} onChange={handleInputChange} id="username" />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type="password" className={`${error ? "outline outline-1 outline-red-600" : null} `} name="password" value={userdata.password} onChange={handleInputChange} id="password" />
              </div>
              {error ? (
                <div className="flex w-full justify-center gap-1.5">
                  <Label className="text-red-600">Invalid username or password</Label>
                </div>
              ) : null}
              <div className="flex flex-row justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked)} />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
                <Link className="text-blue-500 text-sm" href="#">
                  Forgot my password
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;