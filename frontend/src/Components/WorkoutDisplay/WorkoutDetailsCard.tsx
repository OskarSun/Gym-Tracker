import React, { useState } from 'react'
import type { CreateWorkoutExerciseSetDto, WorkoutExercise } from '../../types'
import WorkoutSetCard from './WorkoutSetCard';

type Props = {
    we: WorkoutExercise
    onDelete: (exerciseId: number) => void;
    onAddSet: (set: CreateWorkoutExerciseSetDto) => void; 
    onUpdateSet: (setId: number, updatedSet: any) => void;  
    onDeleteSet: (setId: number) => void; 
}

const WorkoutDetailsCard = ({we, onDelete, onAddSet, onUpdateSet, onDeleteSet}: Props) => {
  const sets = we.sets || [];

  const [newSet, setNewSet] = useState<CreateWorkoutExerciseSetDto>({
    reps: 0,
    weight: 0,
    isWarmUp: false,
  });

  const handleDelete = () => {
      if (confirm(`Are you sure you want to delete the exercise "${we.exerciseName}"?`)) {
        onDelete(we.exerciseId);
    }
  }

  const handleAddSet = () => {
    onAddSet(newSet);
  }


  return (
    <div>
        Exercise: {we.exerciseName}
              <ul>
                {sets.map((set, index) => (
                  
                <WorkoutSetCard key={set.id ?? index}
                set={we.sets ? set : {id:0, reps:0, weight:0, isWarmUp:false}} 
                onDeleteSet={onDeleteSet} 
                onUpdateSet={onUpdateSet}
                />
          
                ))}
              </ul>
              <div>
                <button onClick={handleAddSet}>Add Set</button>
              </div>
              <button onClick={handleDelete}>Delete Exercise</button>
    </div>
  )
}

export default WorkoutDetailsCard