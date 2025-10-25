import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../../../Context/UseAuth';
import type { Workout } from '../../../types';
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from '../../../Services/api';
import WorkoutList from '../../Workout/WorkoutList';
import toast from 'react-hot-toast';
import { set } from 'react-hook-form';

type Props = {
}

const HomePage = ({}: Props) => {
  const { user, logout} = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

 useEffect(() => {
  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchWorkouts();
}, []);

const handleDeleteWorkout = async (id: number) => {
    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter(workout => workout.id !== id));
      toast.success("Workout deleted successfully");
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

const handleCreateWorkout = async (name: string) => {
  try { 
    const newWorkout = await createWorkout(name, token);
    setWorkouts([...workouts, newWorkout]);
    toast.success("Workout added successfully");
    setShowForm(false);
    setName("");
  } catch (error) {
    console.error("Failed to create workout:", error);
  }
}; 

const handleUpdateWorkout = async (id: number, name: string) => {
  try {
    const editWorkout = await updateWorkout(id, name);
    setWorkouts(workouts.map(workout => workout.id === id ? editWorkout : workout));
    toast.success("Workout updated successfully");
  } catch (error) {
    console.error("Failed to update workout:", error);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    )
  } 
  
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, <span>{user}</span> 
          </h1>
          <button
            onClick={logout}
            className="text-sm bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>

        {/* Workouts List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Workouts</h2>
          {workouts.length > 0 ? (
            <WorkoutList
              workouts={workouts}
              onDelete={handleDeleteWorkout}
              onUpdate={handleUpdateWorkout}
            />
          ) : (
            <p className="text-gray-500">No workouts yet. Add one below!</p>
          )}
        </div>

        {/* Add New Workout */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
          >
            {showForm ? "Cancel" : "Add New Workout"}
          </button>

          {showForm && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Workout name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 mb-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <button
                onClick={() => handleCreateWorkout(name)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Add Workout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage