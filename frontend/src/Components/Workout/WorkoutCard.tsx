import React from 'react'
import type { Workout } from '../../types'

type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
}

const WorkoutCard = ({workout, onDelete}: Props) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the workout "${workout.name}"?`)) {
      onDelete(workout.id);
    }
  }
  return (
    <>
    <div>
      {workout.name} - {new Date(workout.date).toLocaleDateString()}
      <button onClick={handleDelete}>Delete</button>
      
    </div>
    
    </>
  )
}

export default WorkoutCard