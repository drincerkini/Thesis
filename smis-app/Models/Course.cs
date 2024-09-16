using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace SchoolManagmentSystem.Models
{
    public class Course
    {
        [Key]
        [Display(Name = "Number")]
        public int CourseID { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 2, ErrorMessage = "Title cannot be shorter than 2 characters or longer than 25 characters.")]
        public string? Title { get; set; }
        [Required]
        [Range(0, 12)]
        public int ECTS { get; set; }

        //relationship

        public int DepartmentID { get; set; }
        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }
        public ICollection<Enrollment>? Enrollments { get; }
        public ICollection<CourseAssignment>? CourseAssignments { get; }
    }
}
