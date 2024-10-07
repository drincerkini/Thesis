
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<Department>> GetAllDepartmentsAsync(string searchString, string sortOrder)
        {
            var departments = _context.Departments.AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                departments = departments.Where(d => d.Name.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "Name":
                    departments = departments.OrderBy(d => d.Name);
                    break;
                case "name_desc":
                    departments = departments.OrderByDescending(d => d.Name);
                    break;
                case "CreatedDate":
                    departments = departments.OrderBy(d => d.CreatedDate);
                    break;
                case "createddate_desc":
                    departments = departments.OrderByDescending(d => d.CreatedDate);
                    break;
                default:
                    departments = departments.OrderBy(d => d.Name);
                    break;
            }

            return departments.AsNoTracking(); // Return IQueryable for further processing
        }


        public async Task<Department> GetDepartmentByIdAsync(int id)
        {
            return await _context.Departments.FindAsync(id);
        }

        public async Task AddDepartmentAsync(Department department)
        {
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDepartmentAsync(Department department)
        {
            _context.Update(department);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDepartmentAsync(int id)
        {
            var department = await GetDepartmentByIdAsync(id);
            if (department != null)
            {
                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Professor>> GetProfessorsByDepartmentIdAsync(int? id)
        {
            return await _context.Professors
                .Where(p => p.DepartmentID == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByDepartmentIdAsync(int? id)
        {
            return await _context.Courses
                .Include(c => c.Professor)
                .Where(c => c.DepartmentID == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Assistant>> GetAssistantsByDepartmentIdAsync(int? id)
        {
            return await _context.Professors
                .Where(p => p.DepartmentID == id)
                .SelectMany(p => p.Assistants)
                .ToListAsync();
        }
    }
}
