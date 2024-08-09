import { createContext, useContext, useState, useEffect } from "react";

import { api } from "@/components/services/Api";
import Loader from "@/components/Loader";
import Welcome from "@/components/Welcome";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [environment, setEnvironment] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [token, setToken] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log("This is running as standalone.");
            setIsStandalone(true);
        } else {
            console.log("This is not running as standalone.");
            setIsStandalone(false);
        }

        const token = localStorage.getItem("token");
        if (token != null) {
            api.setAuthToken(token);
            setIsLoggedIn(true);
        }

        setLoading(false);

    }, []);


    // if (!isStandalone) return (<Welcome />);
    if (loading) return (<Loader />);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                environment,
                setEnvironment,
                // loading,
                // setLoading,
                isStandalone
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;