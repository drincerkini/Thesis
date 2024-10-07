using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Repositories
{
    public class AssistantRepository : IAssistantRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AssistantRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<Assistant>> GetAssistantsAsync(string sortOrder, string searchString, int pageNumber, int pageSize)
        {
            var assistants = from a in _context.Assistants select a;

            if (!string.IsNullOrEmpty(searchString))
            {
                assistants = assistants.Where(p => p.Name.Contains(searchString) || p.Surname.Contains(searchString));
            }

            assistants = sortOrder switch
            {
                "Name" => assistants.OrderBy(p => p.Name),
                "name_desc" => assistants.OrderByDescending(p => p.Name),
                "Surname" => assistants.OrderBy(p => p.Surname),
                "surname_desc" => assistants.OrderByDescending(p => p.Surname),
                "HireDate" => assistants.OrderBy(p => p.HireDate),
                "hiredate_desc" => assistants.OrderByDescending(p => p.HireDate),
                "BirthDate" => assistants.OrderBy(p => p.BirthDate),
                "birthdate_desc" => assistants.OrderByDescending(p => p.BirthDate),
                _ => assistants.OrderBy(p => p.Name),
            };

            return await PaginatedList<Assistant>.CreateAsync(assistants.Include(a => a.Professor).AsNoTracking(), pageNumber, pageSize);
        }

        public async Task<Assistant> GetAssistantByIdAsync(int id)
        {
            return await _context.Assistants
                .Include(a => a.Professor)
                .FirstOrDefaultAsync(m => m.AssistantID == id);
        }

        public async Task<IEnumerable<Professor>> GetAllProfessorsAsync()
        {
            return await _context.Professors.ToListAsync();
        }

        public async Task<IdentityResult> CreateAssistantAsync(Assistant assistant, ApplicationUser user)
        {
            var result = await _userManager.CreateAsync(user, "Password.123");

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Assistant");
                assistant.ApplicationUserId = user.Id; // Assuming this property exists in your model
                _context.Add(assistant);
                await _context.SaveChangesAsync();
            }

            return result;
        }

        public async Task UpdateAssistantAsync(Assistant assistant)
        {
            _context.Update(assistant);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAssistantAsync(int id)
        {
            var assistant = await GetAssistantByIdAsync(id);
            if (assistant != null)
            {
                _context.Assistants.Remove(assistant);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> AssistantExistsAsync(int id)
        {
            return await _context.Assistants.AnyAsync(e => e.AssistantID == id);
        }
    }
}