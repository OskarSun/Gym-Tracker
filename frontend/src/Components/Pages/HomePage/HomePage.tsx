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
    return <div>Loading...</div>;
  } 
  
  
  return (
    <div>
      <div><h1>Welcome {user}</h1></div>

      <h2>Your Workouts:</h2>

      <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} onUpdate={handleUpdateWorkout}/>
      
      <div>
        <button onClick={() => setShowForm(!showForm)}>Add New Workout</button>
        </div>

        {showForm && (
        <div>
          <input
            placeholder="Workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <button onClick={() => handleCreateWorkout(name)}>Add</button>
        </div>
      )}
      
      <button onClick={logout}>Logout</button>

    </div>
  )
}

export default HomePage