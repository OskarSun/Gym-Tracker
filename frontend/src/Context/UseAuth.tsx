import { createContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";

type UserContextType = {
    user : string | null;
    token: string| null;
    registerUser: (username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("username")
        const token = localStorage.getItem("token");
        if(token && user) {
            setToken(token);
            setUser(user);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (username: string, password: string) => {
        try {
            await registerAPI(username, password);
            
            //auto log in
            const loginResponse = await loginAPI(username, password);
            if (loginResponse && loginResponse.token) {
                setToken(loginResponse.token);
                setUser(username);
                localStorage.setItem("token", loginResponse.token);
                localStorage.setItem("username", username);
                axios.defaults.headers.common["Authorization"] = "Bearer " + loginResponse.token;
                toast.success("Registration & login successful!");
                navigate("/homePage");
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data || "Registration failed");
        }
    }

    const loginUser = async (username: string, password: string) => {
        try {
            const loginResponse = await loginAPI(username, password);
            if (loginResponse && loginResponse.token) {
                setToken(loginResponse.token);
                setUser(username);
                localStorage.setItem("token", loginResponse.token);
                localStorage.setItem("username", username);
                axios.defaults.headers.common["Authorization"] = "Bearer " + loginResponse.token;
                toast.success("Login successful!");
                navigate("/homePage");
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data || "Login failed");
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        toast("Logged out");
        navigate("/");
    };

    const isLoggedIn = () => !!token;

    return (
        <UserContext.Provider
            value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);