using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime DateCreated { get; set; }

        // Relationship to Student
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }

}
