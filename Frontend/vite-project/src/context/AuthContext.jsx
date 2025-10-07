import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const getStoredUser = () => {
        try {
            const user = localStorage.getItem("user");
            return user && user !== "undefined" ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    };

    const [user, setUser] = useState(getStoredUser());
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = (userData, tokenValue) => {
        setUser(userData);
        setToken(tokenValue);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenValue);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
