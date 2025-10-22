using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Mappers
{
    public static class WorkoutExerciseMapper
    {
        public static WorkoutExerciseDto ToWorkoutExerciseDto(this WorkoutExercise workoutExercise)
        {
            return new WorkoutExerciseDto
                {
                    ExerciseId = workoutExercise.ExerciseId,
                    ExerciseName = workoutExercise.Exercise?.Name ?? "Unknown",
                    Sets = workoutExercise.Sets?.Select(s => new WorkoutExerciseSetDto
                    {
                        Id = s.Id,
                        Reps = s.Reps,
                        Weight = s.Weight,
                        IsWarmUp = s.IsWarmUp
                    }).ToList() ?? new List<WorkoutExerciseSetDto>()
                };
        }

        public static WorkoutExerciseDto AddExerciseToWorkout(this AddExerciseToWorkoutDto addExerciseDto)
        {
            return new WorkoutExerciseDto
            {
                ExerciseId = addExerciseDto.ExerciseId,
                Sets = new List<WorkoutExerciseSetDto>()
            };
        }


    }
}