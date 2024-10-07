using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;
using System.Linq.Expressions;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IStudentRepository
    {
        Task<Student> GetStudentByEmailAsync(string email);
        Task<Student> GetStudentByIdAsync(int id);
        Task<List<Student>> GetAllStudentsAsync(string searchString, string sortOrder, int pageNumber, int pageSize);
        Task AddStudentAsync(Student student);
        Task UpdateStudentAsync(Student student);
        Task DeleteStudentAsync(int id);
        Task<List<Grade>> GetGradesByStudentIdAsync(int studentId);
        Task<Enrollment> GetEnrollmentAsync(int studentId, int courseId);
        Task AddEnrollmentAsync(Enrollment enrollment);
        Task RemoveEnrollmentAsync(Enrollment enrollment);
        Task<Grade> GetGradeAsync(int gradeId);
        Task SaveChangesAsync();
        Task<List<CourseWithProfessorViewModel>> GetCoursesWithProfessorsAsync();
        Task DeleteGradeAsync(Grade grade);
        Task<List<Notification>> GetUnreadNotificationsAsync(int studentId);
        Task<Notification> GetNotificationByIdAsync(int id);
    }
}
