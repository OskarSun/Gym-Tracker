using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class WorkoutExerciseSetDto
    {
        public int Id { get; set; }
        public int Reps { get; set; }
        public int Weight { get; set; }
        public bool IsWarmUp { get; set; } = false;
    }

    public class CreateWorkoutExerciseSetDto
    {
        public int Reps { get; set; }
        public int Weight { get; set; }
        public bool IsWarmUp { get; set; } = false;
    }
}