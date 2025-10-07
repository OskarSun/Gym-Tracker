using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            
            return Ok(exercises);
        }


    }
}