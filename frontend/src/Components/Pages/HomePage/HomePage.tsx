import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../../../Context/UseAuth';
import type { Workout } from '../../../types';
import { deleteWorkout, getWorkouts } from '../../../Services/api';
import WorkoutList from '../../Workout/WorkoutList';
import toast from 'react-hot-toast';

type Props = {
}

const HomePage = ({}: Props) => {
  const { user, logout} = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDeleteWorkout = async (id: number) => {
    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter(workout => workout.id !== id));
      toast.success("Workout deleted successfully");
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };


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

  if (loading) {
    return <div>Loading...</div>;
  } 
  
  return (
    <div>
      <div><h1>Welcome {user}</h1></div>

      <h2>Your Workouts:</h2>

      <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
      
      <div>
        <button>Create New Workout</button>
        </div>
      
      <button onClick={logout}>Logout</button>

    </div>
  )
}

export default HomePage