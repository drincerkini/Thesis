using Microsoft.AspNetCore.Identity;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IAcStaffRepository
    {
        Task<IEnumerable<AcStaff>> GetAllAsync(string sortOrder, string searchString);
        Task<AcStaff> GetByIdAsync(int id);
        Task CreateAsync(AcStaff acStaff);
        Task UpdateAsync(AcStaff acStaff);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<Branch>> GetBranchesAsync();
        Task SaveChangesAsync();
    }
}
