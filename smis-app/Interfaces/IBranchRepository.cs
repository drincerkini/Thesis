using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IBranchRepository
    {
        Task<IEnumerable<Branch>> GetAllAsync(string sortOrder, string searchString, int pageNumber, int pageSize);
        Task<Branch> GetByIdAsync(int id);
        Task CreateAsync(Branch branch);
        Task UpdateAsync(Branch branch);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
        Task<IEnumerable<Department>> GetDepartmentsAsync();
        Task CreateDeptBranchAsync(DeptBranch deptBranch);
        Task<bool> BranchExistsAsync(int id);
    }
}
