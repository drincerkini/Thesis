using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<DeptBranch> DeptBranches { get; set; }
        public DbSet<CourseAssignment> CourseAssignments { get; set; }
        public DbSet<Assistant> Assistants { get; set; }
        public DbSet<AcStaff> AcStaffs { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Artikulli> Artikulli { get; set; }
        public DbSet<Komenti> Komenti { get; set; }


    }
}
