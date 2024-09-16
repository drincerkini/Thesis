using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagmentSystem.Models
{
    public enum Location
    {
        Prishtinë,
        Ferizaj,
        Gjilan,
        Pejë,
        Lipjan,
        Prizren
    }

    public class Branch
    {
        [Key]
        public int BranchID { get; set; }

        [Required]
        public int SMIAL { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "Name cannot be shorter than 2 characters or longer than 20 characters.")]
        public string Name { get; set; }

        public Location? Location { get; set; }

        //relationship

        public ICollection<DeptBranch>? DeptBranches { get; set; }
        public ICollection<AcStaff>? AcStaffs { get; set; }
        //public ICollection<Department> Departments { get; set; }

    }
}

