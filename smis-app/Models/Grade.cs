using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Grade
    {
        [Key]
        public int GradeId { get; set; }

        [Required]
        [Range(0, 10)]
        public int Score { get; set; }

        public DateTime? DateGraded { get; set; }

        // relationships

        [ForeignKey("Course")]
        public int CourseId { get; set; }

        public Course? Course { get; set; }

        [ForeignKey("Student")]
        public int StudentId { get; set; }

        public Student? Student { get; set; }

        [ForeignKey("Professor")]
        public int ProfessorId { get; set; }

        public Professor? Professor { get; set; }
    }
}