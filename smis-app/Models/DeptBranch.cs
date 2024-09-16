using System.ComponentModel.DataAnnotations;

namespace SchoolManagmentSystem.Models
{
    public class DeptBranch
    {
        [Key]
        public int DeptBranchID { get; set; }

        public int DepartmentID { get; set; }

        public int BranchID { get; set; }

        public Department? Department { get; set; }

        public Branch? Branch { get; set; }
    }
}
