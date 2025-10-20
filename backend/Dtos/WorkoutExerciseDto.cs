using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class WorkoutExerciseDto
    {
        public int ExerciseId { get; set; }
        public ICollection<WorkoutExerciseSetDto> Sets { get; set; } = new List<WorkoutExerciseSetDto>();

    }

    public class AddExerciseToWorkoutDto
    {
        [Required]
        public int ExerciseId { get; set; }
    }
    

}