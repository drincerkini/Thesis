using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagmentSystem.Models
{
    public class Department
    {
        [Key]
        public int DepartmentID { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "Name cannot be shorter than 2 characters or longer than 20 characters.")]
        public string Name { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}")]
        public DateTime CreatedDate { get; set; } = DateTime.Today;


        //relationships

        public ICollection<Course>? Courses { get; set; }

        public ICollection<Professor>? Professors { get; set; }

        public ICollection<Student>? Students { get; set; }

        public ICollection<DeptBranch>? DeptBranches { get; set; }
        //  public ICollection<Branch> Branches { get; set; }
        
    }
}

