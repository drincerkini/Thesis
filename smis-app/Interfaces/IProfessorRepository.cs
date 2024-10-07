using SchoolManagmentSystem.Models;
using System.Linq.Expressions;

namespace SchoolManagmentSystem.Repositories
{
    public interface IProfessorRepository
    {
        Task<Professor> GetProfessorByIdAsync(int id);
        Task<IEnumerable<Professor>> GetAllProfessorsAsync(string sortOrder, string searchString, int pageNumber, int pageSize);
        Task CreateProfessorAsync(Professor professor);
        Task UpdateProfessorAsync(Professor professor);
        Task DeleteProfessorAsync(int id);
        Task<IEnumerable<Assistant>> GetAssistantsByProfessorIdAsync(int professorId);
        Task<IEnumerable<Grade>> GetGradesByProfessorIdAsync(int professorId);
        Task<IEnumerable<Course>> GetCoursesByProfessorEmailAsync(string email);
        Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAndProfessorIdAsync(int courseId, int professorId);
        Task<bool> ProfessorExistsAsync(int id);
        Task<IEnumerable<Department>> GetDepartmentsAsync();
        Task<Professor> GetProfessorByEmailAsync(string email);
        Task<IEnumerable<Course>> GetCoursesByProfessorIdAsync(int professorId);
        Task<Course> GetCourseByIdAndProfessorIdAsync(int courseId, int professorId);
        Task<List<int>> GetGradedStudentIdsAsync(int courseId);
        Task SaveOrUpdateGradeAsync(int studentId, int courseId, int score, int professorId);
        Task AddNotificationForStudentAsync(int studentId, string courseName, int score);
        Task<IEnumerable<Grade>> GetGradedStudentsByProfessorIdAsync(int professorId);
        Task<bool> RemoveGradeAsync(int gradeId);
    }
}
