using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Student
    {
        [Key]
        [Display(Name = "Number")]
        public int StudentID { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 2, ErrorMessage = "Name cannot be shorter than 2 characters or longer than 15 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 2, ErrorMessage = "Surname cannot be shorter than 2 characters or longer than 15 characters.")]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}")]
        [DisplayName("Birth Date")]
        public DateTime BirthDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}")]
        [DisplayName("Register Date")]
        public DateTime RegisterDate { get; set; } = DateTime.Today;

        public string Address { get; set; }
        [Display(Name = "Full Name")]

        public string FullName
        {
            get
            {
                return Name + " " + Surname;
            }
        }

        //relationship
        // Many-to-many relationship with Course through Enrollment
        public int DepartmentID { get; set; }

        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }

                
        // One-to-many relationship with Grade
        public ICollection<Grade>? Grades { get; set; }

        // New: Link with ApplicationUser
        public string? ApplicationUserId { get; set; } // Store the ApplicationUser ID
        [ForeignKey("ApplicationUserId")]
        public ApplicationUser? ApplicationUser { get; set; } // Navigation property
    }
}