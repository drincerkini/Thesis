using System.ComponentModel.DataAnnotations;

namespace SchoolManagmentSystem.Models
{
    public class Artikulli
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        //RELATIONSHP

        public ICollection<Komenti>? Komentet { get; set; }
    }
}
