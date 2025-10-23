export interface UserData {
    username: string;
    password: string;
}

export interface Token {
    token: string;
}

export interface Workout {
  id: number;
  name: string;
  date: string;
  workoutExercises?: WorkoutExercise[];
}

export interface WorkoutExercise {
  exerciseId: number;
  exerciseName: string;
  sets: WorkoutExerciseSet[];
}

export interface WorkoutExerciseSet {
  id: number;
  reps: number;
  weight: number;
  isWarmUp: boolean;
}

export interface CreateWorkoutExerciseSetDto {
  reps: number;
  weight: number;
  isWarmUp: boolean;
}

export interface UpdateWorkoutExerciseSetDto {
  reps?: number;
  weight?: number;
  isWarmUp?: boolean;
}

export interface Exercise {
  id: number;
  name: string;
}

export interface CreateExerciseDto {
  name: string;
}


