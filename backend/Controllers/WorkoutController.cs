using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/workout")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public WorkoutController(ApplicationDBContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetWorkouts()
        {
            var workouts = await _context.Workouts
            .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Sets)
            .ToListAsync();

            if (workouts == null)
            {
                return NotFound();
            }

            var workoutDtos = workouts.Select(w => w.ToWorkoutDto()).ToList();

            return Ok(workoutDtos);
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetWorkoutById(int id)
        {
            var workout = await _context.Workouts
                .Include(w => w.WorkoutExercises)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (workout == null)
            {
                return NotFound();
            }

            var workoutDto = workout.ToWorkoutDto();

            return Ok(workoutDto);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateWorkout([FromBody] CreateWorkoutDto workoutDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var workoutModel = workoutDto.ToWorkoutFromCreateDto();
            workoutModel.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("User ID not found in token.");

            _context.Workouts.Add(workoutModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkoutById), new { id = workoutModel.Id }, workoutModel.ToWorkoutDto());
        }

        [Authorize]
        [HttpPost]
        [Route("{workoutId:int}/addExercise")]
        public async Task<IActionResult> AddExerciseToWorkout([FromRoute] int workoutId, [FromBody] AddExerciseToWorkoutDto workoutExerciseDto)
        {
            var workout = await _context.Workouts
                .Include(w => w.WorkoutExercises)
                .FirstOrDefaultAsync(w => w.Id == workoutId);

            if (workout == null)
            {
                return NotFound(new { Message = "Workout not found" });
            }

            var exercise = await _context.Exercises.FindAsync(workoutExerciseDto.ExerciseId);
            if (exercise == null)
            {
                return NotFound(new { Message = "Exercise not found" });
            }

            var workoutExercise = new Models.WorkoutExercise
            {
                WorkoutId = workoutId,
                ExerciseId = workoutExerciseDto.ExerciseId,
            };

            workout.WorkoutExercises.Add(workoutExercise);
            await _context.SaveChangesAsync();

            return Ok(workout.ToWorkoutDto());
        }

        [Authorize]
        [HttpPost]
        [Route("{workoutId:int}/exercise/{exerciseId:int}/addSet")]

        public async Task<IActionResult> AddSetToExerciseInWorkout([FromRoute] int workoutId, [FromRoute] int exerciseId, [FromBody] WorkoutExerciseSetDto setDto)
        {
            var workoutExercise = await _context.WorkoutExercises
                .Include(we => we.Sets)
                .FirstOrDefaultAsync(we => we.WorkoutId == workoutId && we.ExerciseId == exerciseId);

            if (workoutExercise == null)
            {
                return NotFound(new { Message = "Workout or Exercise not found in the specified workout" });
            }

            var newSet = new Models.WorkoutExerciseSet
            {
                Reps = setDto.Reps,
                Weight = setDto.Weight,
                IsWarmUp = setDto.IsWarmUp
            };

            workoutExercise.Sets.Add(newSet);
            await _context.SaveChangesAsync();

            return Ok(workoutExercise.ToWorkoutExerciseDto());
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateWorkout(int id, [FromBody] CreateWorkoutDto workoutDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            workout.Name = workoutDto.Name;
            await _context.SaveChangesAsync();

            return Ok(workout.ToWorkoutDto());
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}