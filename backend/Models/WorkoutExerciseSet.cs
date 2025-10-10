using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class WorkoutExerciseSet
    {
        public int Id { get; set; }
        public int WorkoutExerciseId { get; set; }
        public WorkoutExercise WorkoutExercise { get; set; } = null!;

        public int Reps { get; set; }
        public int Weight { get; set; }
        public bool IsWarmUp { get; set; }
    }
}