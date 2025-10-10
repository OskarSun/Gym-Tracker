using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class User : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExerciseSet_WorkoutExercises_WorkoutExerciseWorkoutI~",
                table: "WorkoutExerciseSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkoutExerciseSet",
                table: "WorkoutExerciseSet");

            migrationBuilder.RenameTable(
                name: "WorkoutExerciseSet",
                newName: "WorkoutExerciseSets");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutExerciseSet_WorkoutExerciseWorkoutId_WorkoutExercise~",
                table: "WorkoutExerciseSets",
                newName: "IX_WorkoutExerciseSets_WorkoutExerciseWorkoutId_WorkoutExercis~");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkoutExerciseSets",
                table: "WorkoutExerciseSets",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExerciseSets_WorkoutExercises_WorkoutExerciseWorkout~",
                table: "WorkoutExerciseSets",
                columns: new[] { "WorkoutExerciseWorkoutId", "WorkoutExerciseExerciseId" },
                principalTable: "WorkoutExercises",
                principalColumns: new[] { "WorkoutId", "ExerciseId" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExerciseSets_WorkoutExercises_WorkoutExerciseWorkout~",
                table: "WorkoutExerciseSets");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkoutExerciseSets",
                table: "WorkoutExerciseSets");

            migrationBuilder.RenameTable(
                name: "WorkoutExerciseSets",
                newName: "WorkoutExerciseSet");

            migrationBuilder.RenameIndex(
                name: "IX_WorkoutExerciseSets_WorkoutExerciseWorkoutId_WorkoutExercis~",
                table: "WorkoutExerciseSet",
                newName: "IX_WorkoutExerciseSet_WorkoutExerciseWorkoutId_WorkoutExercise~");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkoutExerciseSet",
                table: "WorkoutExerciseSet",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExerciseSet_WorkoutExercises_WorkoutExerciseWorkoutI~",
                table: "WorkoutExerciseSet",
                columns: new[] { "WorkoutExerciseWorkoutId", "WorkoutExerciseExerciseId" },
                principalTable: "WorkoutExercises",
                principalColumns: new[] { "WorkoutId", "ExerciseId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
