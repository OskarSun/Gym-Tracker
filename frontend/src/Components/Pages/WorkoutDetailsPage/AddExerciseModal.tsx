import { useEffect, useState } from "react";
import type { Exercise } from "../../../types";
import { getExercises, createExercise } from "../../../Services/api";

type Props = {
  onSelect: (exerciseId: number) => void;
  onClose: () => void;
};

const AddExerciseModal = ({ onSelect, onClose }: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        console.error("Failed to load exercises", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleCreate = async () => {
    if (!newExerciseName.trim()) return;
    try {
      const created = await createExercise({ name: newExerciseName });
      setExercises((prev) => [...prev, created]);
      setNewExerciseName("");
    } catch (err) {
      console.error("Failed to create exercise", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 flex flex-col gap-4 relative">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Select or Create Exercise
        </h2>

        {/* Exercise List */}
        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Loading...</p>
        ) : (
          <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {exercises.map((ex) => (
              <li
                key={ex.id}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded px-3 py-2"
              >
                <span className="text-gray-900 dark:text-white">{ex.name}</span>
                <button
                  onClick={() => onSelect(ex.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}

        <hr className="border-gray-300 dark:border-gray-600" />

        {/* Create New Exercise */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Create New Exercise
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Exercise name"
            value={newExerciseName}
            onChange={(e) => setNewExerciseName(e.target.value)}
            className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
          />
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition"
          >
            Create
          </button>
        </div>

        <hr className="border-gray-300 dark:border-gray-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="self-end bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddExerciseModal;
