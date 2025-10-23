import axios from "axios";
import type { CreateWorkoutExerciseSetDto, UpdateWorkoutExerciseSetDto, Workout } from "../types";

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

export const getWorkoutExercise = async (workoutId: number) => {
    try {
        const response = await axios.get<Workout>(
            `${api}/workout/${workoutId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addExerciseToWorkout = async (workoutId: number, exerciseId: number) => {
    try {
        const response = await axios.post(
            `${api}/workout/${workoutId}/addExercise`,
            { exerciseId }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteExerciseFromWorkout = async (workoutId: number, exerciseId: number) => {
    try {
        await axios.delete(
            `${api}/workout/${workoutId}/exercise/${exerciseId}`,
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addSetToExercise = async (workoutId: number, exerciseId: number, setDto: CreateWorkoutExerciseSetDto) => {
    try {
        const response = await axios.post(
            `${api}/workout/${workoutId}/exercise/${exerciseId}/addSet`,
            { setDto }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateSetToExercise = async (workoutId: number,exerciseId: number,setId: number,updatedSet: UpdateWorkoutExerciseSetDto) => {
  const response = await axios.put(
    `${api}/workout/${workoutId}/exercise/${exerciseId}/set/${setId}`,
    updatedSet
  );
  return response.data;
};

export const deleteSetFromExercise = async (workoutId: number, exerciseId: number, setId: number) => {
  const response = await axios.delete(
    `${api}/workout/${workoutId}/exercise/${exerciseId}/set/${setId}`
  );
  return response.data;
};

export const getExercises = async () => {
    try {
        const response = await axios.get(
            `${api}/exercise`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createExercise = async (exerciseDto: { name: string }) => {
    try {
        const response = await axios.post(
            `${api}/exercise`,
            exerciseDto
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
