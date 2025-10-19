using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDBContext : DbContext
    {
         private readonly IHttpContextAccessor _httpContextAccessor;
        public ApplicationDBContext(DbContextOptions dbContextOptions, IHttpContextAccessor httpContextAccessor) : base(dbContextOptions)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
        public DbSet<WorkoutExerciseSet> WorkoutExerciseSets { get; set; }
        public DbSet<User> Users { get; set; }

        private string CurrentUserId => _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        private bool IsAdmin => _httpContextAccessor.HttpContext?.User.IsInRole("Admin") ?? false;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WorkoutExercise>()
                .HasKey(we => new { we.WorkoutId, we.ExerciseId });

            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Workout)
                .WithMany(w => w.WorkoutExercises)
                .HasForeignKey(we => we.WorkoutId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Exercise)
                .WithMany(e => e.WorkoutExercises)
                .HasForeignKey(we => we.ExerciseId)
                .IsRequired(false);

            modelBuilder.Entity<Workout>()
                .HasQueryFilter(w => w.UserId == CurrentUserId || IsAdmin);

            modelBuilder.Entity<Exercise>()
                .HasQueryFilter(e => e.UserId == CurrentUserId || IsAdmin);
            
            // seeding admin user

            var adminId = "00000000-0000-0000-0000-000000000001"; 
            var adminPasswordHash = "AQAAAAIAAYagAAAAEK25elJiEQdt7brQW98raGerzd8l+TcRncphDEBmkDsIEpEU9SIrhyoTpzpo8wNL6A==";

            var admin = new User
            {
                Id = adminId,
                Username = "Admin",
                PasswordHash = adminPasswordHash,
                Role = "Admin"
            };


            modelBuilder.Entity<User>().HasData(admin);
        }

        
    }
}