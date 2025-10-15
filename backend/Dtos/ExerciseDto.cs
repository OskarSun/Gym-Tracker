using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class ExerciseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
    }

    public class CreateExerciseDto
    {

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string MuscleGroup { get; set; } = string.Empty;
    }

    public class UpdateExerciseDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string MuscleGroup { get; set; } = string.Empty;
    }


}