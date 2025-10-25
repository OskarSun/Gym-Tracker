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
        <p className="text-gray-500 dark:text-gray-400 text-center py-6">
        No workouts found. Add one to get started!
      </p>
      ) : (
        <div className="flex flex-col gap-4">
          {[...workouts]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
        </div>
        )}
    </>
    
  )
}

export default WorkoutList