using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "Role", "Username" },
                values: new object[] { "de93e1dc-4452-46f1-9972-1b8e3f9a6c01", "AQAAAAIAAYagAAAAEGISEaYscvdFEaxVkdCeDSub5s6v+DqaUyIVpX03YJHZrFmdo0Dr14XnKpo0kLwn1g==", "Admin", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "de93e1dc-4452-46f1-9972-1b8e3f9a6c01");
        }
    }
}
