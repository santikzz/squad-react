import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectContext = createContext();

export const RedirectProvider = ({ children }) => {
    const navigate = useNavigate();

    const redirect = (path) => {
        navigate(path);
    };

    return (
        <RedirectContext.Provider value={redirect}>
            {children}
        </RedirectContext.Provider>
    );
};

export const useRedirect = () => {
    return useContext(RedirectContext);
};
