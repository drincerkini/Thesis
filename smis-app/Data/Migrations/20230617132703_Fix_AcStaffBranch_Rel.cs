using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagmentSystem.Data.Migrations
{
    public partial class Fix_AcStaffBranch_Rel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AcStaffs_Departments_DepartmentID",
                table: "AcStaffs");

            migrationBuilder.RenameColumn(
                name: "DepartmentID",
                table: "AcStaffs",
                newName: "BranchID");

            migrationBuilder.RenameIndex(
                name: "IX_AcStaffs_DepartmentID",
                table: "AcStaffs",
                newName: "IX_AcStaffs_BranchID");

            migrationBuilder.AddForeignKey(
                name: "FK_AcStaffs_Branches_BranchID",
                table: "AcStaffs",
                column: "BranchID",
                principalTable: "Branches",
                principalColumn: "BranchID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AcStaffs_Branches_BranchID",
                table: "AcStaffs");

            migrationBuilder.RenameColumn(
                name: "BranchID",
                table: "AcStaffs",
                newName: "DepartmentID");

            migrationBuilder.RenameIndex(
                name: "IX_AcStaffs_BranchID",
                table: "AcStaffs",
                newName: "IX_AcStaffs_DepartmentID");

            migrationBuilder.AddForeignKey(
                name: "FK_AcStaffs_Departments_DepartmentID",
                table: "AcStaffs",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DepartmentID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
