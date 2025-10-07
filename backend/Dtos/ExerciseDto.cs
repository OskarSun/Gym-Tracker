using System;
using System.Collections.Generic;
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
}