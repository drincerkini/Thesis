using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Xml.Linq;

namespace SchoolManagmentSystem.Models
{
    public class AcStaff
    {
        [Key]
        public int AcStaffID { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Name cannot be shorter than 3 characters or longer than 15 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Name cannot be shorter than 3 characters or longer than 15 characters.")]
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
        [DisplayName("Hire Date")]
        public DateTime HireDate { get; set; } = DateTime.Today;

        public string Address { get; set; }

        [Display(Name = "Full Name")]
        public string FullName
        {
            get { return Name + " " + Surname; }
        }

        //relationship
        public int BranchID { get; set; }
        [ForeignKey("BranchID")]
        public Branch? Branch { get; set; }


        // New: Link with ApplicationUser
        public string? ApplicationUserId { get; set; } // Store the ApplicationUser ID
        [ForeignKey("ApplicationUserId")]
        public ApplicationUser? ApplicationUser { get; set; } // Navigation property
    }
}
