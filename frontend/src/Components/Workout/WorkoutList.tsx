import React from 'react'
import type { Workout } from '../../types';
import WorkoutCard from './WorkoutCard';

type Props = {
    workouts: Workout[];
    onDelete: (id: number) => void;
    onUpdate: (id: number, name: string) => void;
}

const WorkoutList = ({workouts, onDelete, onUpdate}: Props) => {
  return (
    <>
    {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete} onUpdate={onUpdate}/>
            ))}
        </div>
        )}
    </>
    
  )
}

export default WorkoutList