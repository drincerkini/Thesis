using System.ComponentModel.DataAnnotations;

namespace SchoolManagmentSystem.Models
{
    public enum Grade
    {
        A, B, C, D, E, F
    }
    public class Enrollment
    {
        [Key]
        public int EnrollmentID { get; set; }

        public int StudentID { get; set; }

        public int CourseID { get; set; }

        public Student? Student { get; set; }

        public Course? Course { get; set; }

        public Grade? Grade { get; set; }

    }
}
