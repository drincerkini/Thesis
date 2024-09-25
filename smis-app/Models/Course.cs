using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace SchoolManagmentSystem.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required]
        public string CourseName { get; set; }

        //relationship
        public int DepartmentID { get; set; }
        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }

        // Foreign key to Professor (one professor teaches many courses)
        public int ProfessorId { get; set; }
        [ForeignKey("ProfessorId")]
        public Professor? Professor { get; set; }

        // Many-to-many relationship with Student through Enrollment
        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
