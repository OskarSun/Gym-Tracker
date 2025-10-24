import axios from "axios";
import type { Token, UserData } from "../types";

const api = import.meta.env.VITE_API_URL || "http://localhost:5119/api";

export const loginAPI = async (username: string, password: string) => {
    try {
        const response = await axios.post<Token>(`${api}/auth/login`, {
            username: username,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const registerAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserData>(`${api}/auth/register`, {
            username: username,
            password: password
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};