using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<IQueryable<Department>> GetAllDepartmentsAsync(string searchString, string sortOrder);
        Task<Department> GetDepartmentByIdAsync(int id);
        Task AddDepartmentAsync(Department department);
        Task UpdateDepartmentAsync(Department department);
        Task DeleteDepartmentAsync(int id);
        Task<IEnumerable<Professor>> GetProfessorsByDepartmentIdAsync(int? id);
        Task<IEnumerable<Course>> GetCoursesByDepartmentIdAsync(int? id);
        Task<IEnumerable<Assistant>> GetAssistantsByDepartmentIdAsync(int? id);

    }
}
