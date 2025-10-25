import React from 'react'
import type { Workout } from '../../types'
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  
}

const WorkoutCard = ({workout, onDelete, onUpdate}: Props) => {
  const navigate = useNavigate();
  const [name, setName] = React.useState<string>("");
  const [showForm, setShowForm] = React.useState<boolean>(false); // Both card and homepage have showForm. Consider making a reusable component later.
                                                                  // Consider using a modal for editing as well.

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete the workout "${workout.name}"?`)) {
      onDelete(workout.id);
    }
  }

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowForm(!showForm);
  }
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/workout/${workout.id}`)}
    >
      {/* Workout Name and Date */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {workout.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(workout.date).toLocaleDateString()}
      </p>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg transition"
        >
          {showForm ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition"
        >
          Delete
        </button>
      </div>

      {/* Edit Form */}
      {showForm && (
        <div className="mt-2 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(workout.id, name);
              setShowForm(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg transition"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard