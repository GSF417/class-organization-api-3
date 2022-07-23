using Microsoft.EntityFrameworkCore.Migrations;

namespace Todo.Migrations
{
    public partial class CreateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ucs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UC = table.Column<string>(type: "NVARCHAR", maxLength: 150, nullable: false),
                    UcPrereq = table.Column<string>(type: "NVARCHAR", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "NVARCHAR", maxLength: 80, nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR", maxLength: 80, nullable: false),
                    Password = table.Column<string>(type: "NVARCHAR", maxLength: 80, nullable: false),
                    UCs = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ucs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
