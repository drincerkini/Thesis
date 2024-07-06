using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string Gender { get; set; }

        public int DepartmentId { get; set; } // Foreign key

        [JsonIgnore]
        public Department? Department { get; set; } // Navigation property
    }
}
