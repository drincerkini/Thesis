using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Interfaces
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task<Course> GetByIdAsync(int id);
        Task AddAsync(Course course);
        Task UpdateAsync(Course course);
        Task DeleteAsync(int id);
        Task<bool> CourseExistsAsync(int id);
        Task<IEnumerable<Department>> GetAllDepartmentsAsync();
        Task<IEnumerable<Professor>> GetAllProfessorsAsync();
    }
}
