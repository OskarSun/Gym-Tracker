import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addExerciseToWorkout, addSetToExercise, deleteExerciseFromWorkout, deleteSetFromExercise, getWorkoutExercise, updateSetToExercise } from "../../../Services/api";
import type { CreateWorkoutExerciseSetDto, UpdateWorkoutExerciseSetDto, Workout } from "../../../types";
import WorkoutDetailsList from "../../WorkoutDisplay/WorkoutDetailsList";
import toast from "react-hot-toast";
import AddExerciseModal from "./AddExerciseModal";

const WorkoutDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const data = await getWorkoutExercise(Number(id));
        setWorkout(data);
      } catch (error) {
        console.error("Failed to fetch workout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]); 

  const goToHome = () => {
    navigate("/homePage");
  }

  const handleAddExercise = async (exerciseId: number) => {
  if (!id || exerciseId <= 0) return;

  try {
    const updatedWorkout = await addExerciseToWorkout(Number(id), exerciseId);
    setWorkout(updatedWorkout);  
    toast.success("Exercise added successfully");
  } catch (error) {
    console.error("Failed to add exercise:", error);
  }
};


   const handleDeleteExercise = async (exerciseId: number) => {
  if (!id || exerciseId <= 0) return;

  try {
    await deleteExerciseFromWorkout(Number(id), exerciseId);
    setWorkout(prevWorkout => {
      if (!prevWorkout) return prevWorkout;
      return {
        ...prevWorkout,
        workoutExercises: (prevWorkout.workoutExercises || []).filter(
          we => we.exerciseId !== exerciseId
        ),
      };
    }); 
    toast.success("Exercise deleted successfully");
  } catch (error) {
    console.error("Failed to delete exercise:", error);
  }
}; 

   const handleAddSet = async (exerciseId: number,newSet: CreateWorkoutExerciseSetDto) => {
    if (!id) return;

    try {
      const createdSet = await addSetToExercise(Number(id), exerciseId, newSet);

      setWorkout((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          workoutExercises: prev.workoutExercises?.map((we) =>
            we.exerciseId === exerciseId
              ? { ...we, sets: [...(we.sets || []), createdSet] }
              : we
          ),
        };
      });

      toast.success("Set added!");
    } catch (error) {
      console.error("Failed to add set:", error);
      toast.error("Failed to add set");
    }
  };

  const handleUpdateSet = async (exerciseId: number, setId: number, updatedSet: UpdateWorkoutExerciseSetDto) => {
    if (!id) return;

    try {
      const updatedSetFromApi = await updateSetToExercise(Number(id), exerciseId, setId, updatedSet);
      setWorkout((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          workoutExercises: prev.workoutExercises?.map((we) =>
            we.exerciseId === exerciseId
              ? {
                  ...we,
                  sets: we.sets.map((set) => 
                    set.id === setId ? updatedSetFromApi : set
                  ),
                }
              : we
          ),
        };
      });
      toast.success("Set updated!");
    } catch (error) {
      console.error("Failed to update set:", error);
      toast.error("Failed to update set");
    }   
  };

  const handleDeleteSet = async (exerciseId: number, setId: number) => {
    if (!id) return;
    try {
      await deleteSetFromExercise(Number(id), exerciseId, setId);
      setWorkout((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          workoutExercises: prev.workoutExercises?.map((we) =>
            we.exerciseId === exerciseId
              ? { ...we, sets: we.sets.filter((set) => set.id !== setId) }
              : we
          ),
        };
      }); 
      toast.success("Set deleted!");
    } catch (error) {
      console.error("Failed to delete set:", error);
      toast.error("Failed to delete set");
    }
  };



  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading workout...</p>
      </div>
    );
  if (!workout)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Workout not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">
          {workout.name} - {new Date(workout.date).toLocaleDateString()}
        </h1>

        {/* Workout Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <WorkoutDetailsList
            workout={workout}
            onDelete={async (exerciseId) => await handleDeleteExercise(exerciseId)}
            onAddSet={async (exerciseId, newSet) =>
              await handleAddSet(exerciseId, newSet)
            }
            onUpdateSet={async (exerciseId, setId, updatedSet) =>
              await handleUpdateSet(exerciseId, setId, updatedSet)
            }
            onDeleteSet={async (exerciseId, setId) =>
              await handleDeleteSet(exerciseId, setId)
            }
          />
        </div>

        {/* Add Exercise */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-lg font-semibold">Add Exercise</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add Exercise
          </button>
          {showAddModal && (
            <AddExerciseModal
              onSelect={async (exerciseId) => {
                await handleAddExercise(exerciseId);
                setShowAddModal(false);
              }}
              onClose={() => setShowAddModal(false)}
            />
          )}
        </div>

        {/* Return Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={goToHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
