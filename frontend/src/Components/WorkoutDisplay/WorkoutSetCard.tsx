import React, { useState } from 'react'
import type { UpdateWorkoutExerciseSetDto, WorkoutExerciseSet } from '../../types'

type Props = {
    set: WorkoutExerciseSet
    onUpdateSet: (setId: number, updatedSet: UpdateWorkoutExerciseSetDto) => void;
    onDeleteSet: (setId: number) => void;
}

const WorkoutSetCard = ({set, onUpdateSet, onDeleteSet}: Props) => {

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState<UpdateWorkoutExerciseSetDto>({
    reps: Number(""),
    weight:Number(""),
    isWarmUp: set.isWarmUp,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        onUpdateSet(set.id, 
            {reps: Number(form.reps),
            weight: Number(form.weight),
            isWarmUp: form.isWarmUp,});
        setEditMode(false);
    };

    const handleDeleteSet = () => {
        if (set.id) {
            if (confirm(`Are you sure you want to delete this set?`)) {
                onDeleteSet(set.id);
            }
        }
    }

  return (
    <div className="bg-white dark:bg-gray-600 rounded-lg shadow p-3 flex flex-col gap-2">
      {editMode ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="reps"
              value={form.reps}
              onChange={handleChange}
              placeholder="Reps"
              className="w-20 p-1 rounded border border-gray-300 dark:border-gray-500 text-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="w-20 p-1 rounded border border-gray-300 dark:border-gray-500 text-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <label className="flex items-center gap-1 text-sm">
              Warmup:
              <input
                type="checkbox"
                name="isWarmUp"
                checked={form.isWarmUp}
                onChange={handleChange}
                className="w-4 h-4"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-sm">
            Reps: {set.reps}, Weight: {set.weight}, Warmup: {set.isWarmUp ? "Yes" : "No"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteSet}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutSetCard