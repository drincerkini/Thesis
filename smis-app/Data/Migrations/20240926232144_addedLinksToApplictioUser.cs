using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagmentSystem.Data.Migrations
{
    public partial class addedLinksToApplictioUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Komenti");

            migrationBuilder.DropTable(
                name: "Artikulli");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Students",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Professors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Assistants",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "AcStaffs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_ApplicationUserId",
                table: "Students",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Professors_ApplicationUserId",
                table: "Professors",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Assistants_ApplicationUserId",
                table: "Assistants",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AcStaffs_ApplicationUserId",
                table: "AcStaffs",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AcStaffs_AspNetUsers_ApplicationUserId",
                table: "AcStaffs",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Assistants_AspNetUsers_ApplicationUserId",
                table: "Assistants",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Professors_AspNetUsers_ApplicationUserId",
                table: "Professors",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_AspNetUsers_ApplicationUserId",
                table: "Students",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AcStaffs_AspNetUsers_ApplicationUserId",
                table: "AcStaffs");

            migrationBuilder.DropForeignKey(
                name: "FK_Assistants_AspNetUsers_ApplicationUserId",
                table: "Assistants");

            migrationBuilder.DropForeignKey(
                name: "FK_Professors_AspNetUsers_ApplicationUserId",
                table: "Professors");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_AspNetUsers_ApplicationUserId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_ApplicationUserId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Professors_ApplicationUserId",
                table: "Professors");

            migrationBuilder.DropIndex(
                name: "IX_Assistants_ApplicationUserId",
                table: "Assistants");

            migrationBuilder.DropIndex(
                name: "IX_AcStaffs_ApplicationUserId",
                table: "AcStaffs");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Professors");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Assistants");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "AcStaffs");

            migrationBuilder.CreateTable(
                name: "Artikulli",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artikulli", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Komenti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Article_ID = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komenti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Komenti_Artikulli_Article_ID",
                        column: x => x.Article_ID,
                        principalTable: "Artikulli",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Komenti_Article_ID",
                table: "Komenti",
                column: "Article_ID");
        }
    }
}
