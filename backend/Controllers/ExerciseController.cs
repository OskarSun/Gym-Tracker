using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Mappers;
using backend.Dtos;

namespace backend.Controllers
{
    [Route("api/exercise")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ExerciseController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExercises()
        {
            var exercises = await _context.Exercises.ToListAsync();

            if (exercises == null)
            {
                return NotFound();
            }

            var exerciseDtos = exercises.Select(e => e.ToExerciseDto()).ToList();

            return Ok(exerciseDtos);
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetExerciseById(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);

            if (exercise == null)
            {
                return NotFound();
            }

            var exerciseDto = exercise.ToExerciseDto();

            return Ok(exerciseDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise([FromBody] CreateExerciseDto exerciseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exerciseModel = exerciseDto.ToExerciseFromCreateDto();

            _context.Exercises.Add(exerciseModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExerciseById), new { id = exerciseModel.Id }, exerciseModel.ToExerciseDto());
        }

        [HttpPut]
        [Route("{id:int}")]

        public async Task<IActionResult> UpdateExercise([FromRoute] int id, [FromBody] UpdateExerciseDto exerciseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingExercise = await _context.Exercises.FindAsync(id);
            if (existingExercise == null)
            {
                return NotFound();
            }

            existingExercise.Name = exerciseDto.Name;
            existingExercise.MuscleGroup = exerciseDto.MuscleGroup;

            _context.Exercises.Update(existingExercise);
            await _context.SaveChangesAsync();

            return Ok(existingExercise.ToExerciseDto());
        }

        [HttpDelete]
        [Route("{id:int}")] 

        public async Task<IActionResult> DeleteExercise([FromRoute]int id)
        {
            var existingExercise = await _context.Exercises.FindAsync(id);
            if (existingExercise == null)
            {
                return NotFound();
            }

            _context.Exercises.Remove(existingExercise);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}