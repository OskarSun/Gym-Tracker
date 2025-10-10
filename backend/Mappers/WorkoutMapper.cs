using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Mappers
{
    public static class WorkoutMapper
    {
        public static WorkoutDto ToWorkoutDto(this Workout workout)
        {
            return new WorkoutDto
            {
                Id = workout.Id,
                Name = workout.Name,
                Date = workout.Date,
                WorkoutExercises = workout.WorkoutExercises.Select(we => we.ToWorkoutExerciseDto()).ToList()
            };
        }

        public static Workout ToWorkoutFromCreateDto(this CreateWorkoutDto createWorkoutDto)
        {
            return new Workout
            {
                Name = createWorkoutDto.Name,
                Date = DateTime.UtcNow
            };
        }
    }
}