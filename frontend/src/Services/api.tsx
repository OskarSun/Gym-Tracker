import axios from "axios";
import type { Workout } from "../types";

const api = "http://localhost:5119/api";

export const getWorkouts = async () => {
    try {
        const response = await axios.get<Workout[]>(
            `${api}/workout`
        )
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createWorkout = async (name: string, token: string | null) => {
    try {
        const response = await axios.post<Workout>(
            `${api}/workout`,
            { name },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateWorkout = async (id: number, name: string) => {
    try {
        const response = await axios.put<Workout>(
            `${api}/workout/${id}`,
            { name }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteWorkout = async (id: number) => {
    try {
        await axios.delete(`${api}/workout/${id}`)
    } catch (error) {
        console.error(error);
        throw error;
    }
};