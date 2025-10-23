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
    reps: set.reps,
    weight: set.weight,
    isWarmUp: set.isWarmUp,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : Number(value),
        }));
    };

    const handleSubmit = () => {
        onUpdateSet(set.id, form);
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
    <div>
        {editMode ? (
            <div>
                <input
                    type="number"
                    name="reps"
                    value={form.reps}
                    onChange={handleChange}
                    placeholder="Reps"
                />
                <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="Weight"
                />
                <label>
                    Warmup:
                    <input
                        type="checkbox"
                        name="isWarmUp" 
                        checked={form.isWarmUp}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
        ) : (
          <div>
            <span>Reps: {set.reps}, Weight: {set.weight}, Warmup: {set.isWarmUp ? "Yes" : "No"}</span>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={handleDeleteSet}>Delete</button>
          </div>
        )}
        
    </div>
  )
}

export default WorkoutSetCard