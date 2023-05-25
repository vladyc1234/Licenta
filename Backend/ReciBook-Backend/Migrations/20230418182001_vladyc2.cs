using Microsoft.EntityFrameworkCore.Migrations;

namespace ReciBook_Backend.Migrations
{
    public partial class vladyc2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Function",
                table: "Teams",
                newName: "JobType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JobType",
                table: "Teams",
                newName: "Function");
        }
    }
}
