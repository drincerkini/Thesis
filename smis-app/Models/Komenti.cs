using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagmentSystem.Models
{
    public class Komenti
    {
        [Key]
        public int ID { get; set; }

        public string Comment { get; set; }

        public string Title { get; set; }

        //relationship

        public int Article_ID { get; set; }

        [ForeignKey("Article_ID")]
        public Artikulli? Artikulli { get; set; }
    }
}
