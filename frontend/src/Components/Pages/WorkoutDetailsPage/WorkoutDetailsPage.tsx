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
  const [exerciseId, setExerciseId] = useState<number>(0);
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
    setExerciseId(0);
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



  if (loading) return <div>Loading workout...</div>;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div>

      <WorkoutDetailsList 
      workout={workout} 
      onDelete={handleDeleteExercise}
      onAddSet={handleAddSet} 
      onUpdateSet={handleUpdateSet}
      onDeleteSet={handleDeleteSet}/>

      <div>
        <h3>Add Exercise</h3>
        <input
          type="number"
          placeholder="Exercise ID"
          value={exerciseId}
          onChange={(e) => setExerciseId(Number(e.target.value))}
        />
        <button onClick={() => setShowAddModal(true)}>Add Exercise</button>
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
      
      

      <button onClick={goToHome}>Return</button>
    </div>
  );
};

export default WorkoutDetailsPage;
