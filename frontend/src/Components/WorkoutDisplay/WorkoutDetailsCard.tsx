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
    setNewSet({ reps: 0, weight: 0, isWarmUp: false });
  }


  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md p-4 flex flex-col gap-4">
      {/* Exercise Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {we.exerciseName}
        </h3>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition"
        >
          Delete Exercise
        </button>
      </div>

      {/* Sets List */}
      <ul className="flex flex-col gap-2">
        {sets.map((set, index) => (
          <WorkoutSetCard
            key={set.id ?? index}
            set={we.sets ? set : { id: 0, reps: 0, weight: 0, isWarmUp: false }}
            onDeleteSet={onDeleteSet}
            onUpdateSet={onUpdateSet}
          />
        ))}
      </ul>

      {/* Add Set Button */}
      <div className="mt-2">
        <button
          onClick={handleAddSet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Add Set
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetailsCard