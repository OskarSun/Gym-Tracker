
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col gap-6">
      {/* Workout Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {workout.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Date: {new Date(workout.date).toLocaleDateString()}
        </p>
      </div>

      {/* Exercises */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Exercises:
        </h2>

        {workout.workoutExercises && workout.workoutExercises.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {workout.workoutExercises.map((we, index) => (
              <li key={index}>
                <WorkoutDetailsCard
                  we={we}
                  onDelete={onDelete}
                  onAddSet={(set) => onAddSet(we.exerciseId, set)}
                  onDeleteSet={(setId) => onDeleteSet(we.exerciseId, setId)}
                  onUpdateSet={(setId, updatedSet) =>
                    onUpdateSet(we.exerciseId, setId, updatedSet)
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No exercises found for this workout.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetailsList