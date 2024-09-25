using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Grade
    {
        [Key]
        public int GradeId { get; set; }

        [Required]
        [Range(0, 100)] // Assuming grades are from 0 to 100
        public int Score { get; set; }

        // Foreign key to Course
        [ForeignKey("Course")]
        public int CourseId { get; set; }
        public Course? Course { get; set; }

        // Foreign key to Student
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student? Student { get; set; }

        // Foreign key to Professor (who gave the grade)
        [ForeignKey("Professor")]
        public int ProfessorId { get; set; }
        public Professor? Professor { get; set; }
    }
}