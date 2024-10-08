using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Repositories
{
    public class BranchRepository : IBranchRepository
    {
        private readonly ApplicationDbContext _context;

        public BranchRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Branch>> GetAllAsync(string sortOrder, string searchString, int pageNumber, int pageSize)
        {
            // Fetch all branches from the database
            var branches = from a in _context.Branches select a;

            // Filter
            if (!string.IsNullOrEmpty(searchString))
            {
                branches = branches.Where(b => b.Name.Contains(searchString));
            }

            // Sort
            branches = sortOrder switch
            {
                "Name" => branches.OrderBy(b => b.Name),
                "name_desc" => branches.OrderByDescending(b => b.Name),
                "Location" => branches.OrderBy(b => b.Location),
                "location_desc" => branches.OrderByDescending(b => b.Location),
                _ => branches.OrderBy(b => b.Name),
            };

            return await PaginatedList<Branch>.CreateAsync(branches.AsNoTracking(), pageNumber, pageSize);
        }


        public async Task<Branch> GetByIdAsync(int id)
        {
            return await _context.Branches
                         .Include(b => b.DeptBranches)  // Assuming DeptBranches is a navigation property
                         .ThenInclude(db => db.Department) // If DeptBranches has a Department navigation property
                         .FirstOrDefaultAsync(b => b.BranchID == id);
        }

        public async Task CreateAsync(Branch branch)
        {
            _context.Add(branch);
            await SaveChangesAsync();
        }

        public async Task UpdateAsync(Branch branch)
        {
            _context.Update(branch);
            await SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var branch = await GetByIdAsync(id);
            if (branch != null)
            {
                _context.Branches.Remove(branch);
            }
            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Department>> GetDepartmentsAsync()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task CreateDeptBranchAsync(DeptBranch deptBranch)
        {
            _context.Add(deptBranch);
            await SaveChangesAsync();
        }

        public async Task<bool> BranchExistsAsync(int id)
        {
            return await _context.Branches.AnyAsync(e => e.BranchID == id);
        }
    }
}
