using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required]
        public string CourseName { get; set; }

        //relationships
        public int DepartmentID { get; set; }

        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }

        public int ProfessorId { get; set; }

        [ForeignKey("ProfessorId")]
        public Professor? Professor { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
