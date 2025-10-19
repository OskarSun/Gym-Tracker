import React from 'react'
import type { Workout } from '../../types';
import WorkoutCard from './WorkoutCard';

type Props = {
    workouts: Workout[];
    onDelete: (id: number) => void;
}

const WorkoutList = ({workouts, onDelete}: Props) => {
  return (
    <>
    {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete}/>
            ))}
        </div>
        )}
    </>
    
  )
}

export default WorkoutList