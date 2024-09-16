using System.ComponentModel.DataAnnotations;

namespace SchoolManagmentSystem.Models
{
    public class CourseAssignment
    {
        [Key]
        public int CourseAssignmentID { get; set; }

        public int ProfessorID { get; set; }

        public int CourseID { get; set; }

        public Professor? Professor { get; set; }

        public Course? Course { get; set; }
    }
}
