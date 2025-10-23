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
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Select or Create Exercise</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {exercises.map((ex) => (
              <li key={ex.id}>
                {ex.name}
                <button onClick={() => onSelect(ex.id)}>Add</button>
              </li>
            ))}
          </ul>
        )}

        <hr />
        <h3>Create New Exercise</h3>
        <input
          type="text"
          placeholder="Exercise name"
          value={newExerciseName}
          onChange={(e) => setNewExerciseName(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>

        <hr />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddExerciseModal;
