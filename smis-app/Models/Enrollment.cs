using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Enrollment
    {
        [Key]
        public int EnrollmentId { get; set; }

        // Foreign key to Course
        [ForeignKey("Course")]
        public int CourseId { get; set; }

        public Course? Course { get; set; }

        // Foreign key to Student
        [ForeignKey("Student")]
        public int StudentId { get; set; }

        public Student? Student { get; set; }

    }
}
