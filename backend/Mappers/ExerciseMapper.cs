using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Mappers
{
    public static class ExerciseMapper
    {
        public static ExerciseDto ToExerciseDto(this Exercise exercise)
        {
            return new ExerciseDto
            {
                Id = exercise.Id,
                Name = exercise.Name,
                MuscleGroup = exercise.MuscleGroup
            };
        }

        public static Exercise ToExerciseFromCreateDto(this CreateExerciseDto createExerciseDto)
        {
            return new Exercise
            {
                Name = createExerciseDto.Name,
                MuscleGroup = createExerciseDto.MuscleGroup
            };
        }
        
        public static Exercise ToExerciseFromUpdateDto(this UpdateExerciseDto updateExerciseDto)
        {
            return new Exercise
            {
                Name = updateExerciseDto.Name,
                MuscleGroup = updateExerciseDto.MuscleGroup
            };
        }
    }
}