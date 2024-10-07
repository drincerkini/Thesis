using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Repositories
{
    public class AcStaffRepository : IAcStaffRepository
    {
        private readonly ApplicationDbContext _context;

        public AcStaffRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AcStaff>> GetAllAsync(string sortOrder, string searchString)
        {
            var acStaffQuery = _context.AcStaffs.Include(a => a.Branch).AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                acStaffQuery = acStaffQuery.Where(a => a.Name.Contains(searchString) || a.Surname.Contains(searchString));
            }

            // Sort the results based on the sortOrder
            acStaffQuery = sortOrder switch
            {
                "Name" => acStaffQuery.OrderBy(p => p.Name),
                "name_desc" => acStaffQuery.OrderByDescending(p => p.Name),
                "Surname" => acStaffQuery.OrderBy(p => p.Surname),
                "surname_desc" => acStaffQuery.OrderByDescending(p => p.Surname),
                "HireDate" => acStaffQuery.OrderBy(p => p.HireDate),
                "hiredate_desc" => acStaffQuery.OrderByDescending(p => p.HireDate),
                "BirthDate" => acStaffQuery.OrderBy(p => p.BirthDate),
                "birthdate_desc" => acStaffQuery.OrderByDescending(p => p.BirthDate),
                _ => acStaffQuery.OrderBy(p => p.Name),
            };

            return await PaginatedList<AcStaff>.CreateAsync(acStaffQuery.AsNoTracking(), 1, 5);
        }

        public async Task<AcStaff> GetByIdAsync(int id)
        {
            return await _context.AcStaffs.Include(a => a.Branch).FirstOrDefaultAsync(m => m.AcStaffID == id);
        }

        public async Task<IEnumerable<Branch>> GetBranchesAsync()
        {
            return await _context.Branches.ToListAsync();
        }

        public async Task CreateAsync(AcStaff acStaff)
        {
            await _context.AcStaffs.AddAsync(acStaff);
        }

        public async Task UpdateAsync(AcStaff acStaff)
        {
            _context.Update(acStaff);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var acStaff = await GetByIdAsync(id);
            if (acStaff != null)
            {
                _context.AcStaffs.Remove(acStaff);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.AcStaffs.AnyAsync(e => e.AcStaffID == id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
