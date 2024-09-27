using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Assistant
    {
        [Key]
        public int AssistantID { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "Name cannot be shorter than 2 characters or longer than 15 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "Surname cannot be shorter than 2 characters or longer than 15 characters.")]
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
        public string FullName => $"{Name} {Surname}";

        //Relationships

        public int ProfessorID { get; set; }

        [ForeignKey("ProfessorID")]
        public Professor? Professor { get; set; }

        public string? ApplicationUserId { get; set; }

        [ForeignKey("ApplicationUserId")]
        public ApplicationUser? ApplicationUser { get; set; }
    }


}


