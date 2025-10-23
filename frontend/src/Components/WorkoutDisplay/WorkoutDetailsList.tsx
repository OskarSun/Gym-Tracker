import React from 'react'
import type { CreateWorkoutExerciseSetDto, UpdateWorkoutExerciseSetDto, Workout } from '../../types';
import WorkoutDetailsCard from './WorkoutDetailsCard';

type Props = {
    workout: Workout;
    onDelete: (exerciseId: number) => void;
    onAddSet: (exerciseId: number, set: CreateWorkoutExerciseSetDto) => void;
    onUpdateSet: (ExerciseId: number, setId: number, updatedSet: UpdateWorkoutExerciseSetDto) => void;
    onDeleteSet: (exerciseId: number, setId: number) => void;
}

const WorkoutDetailsList = ({workout, onDelete, onAddSet, onUpdateSet, onDeleteSet}: Props) => {
  return (
    <div>
        <h1>{workout.name}</h1>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>

      <h2>Exercises:</h2>
      {workout.workoutExercises && workout.workoutExercises.length > 0 ? (
        <ul>
          {workout.workoutExercises.map((we, index) => (
            <li key={index}>
              <WorkoutDetailsCard we={we}
               onDelete={onDelete}
               onAddSet={(set) => onAddSet(we.exerciseId, set)} 
               onDeleteSet={(setId) => onDeleteSet(we.exerciseId, setId)}
               onUpdateSet={(setId, updatedSet) => onUpdateSet(we.exerciseId, setId, updatedSet)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises found for this workout.</p>
      )}

    </div>
  )
}

export default WorkoutDetailsList