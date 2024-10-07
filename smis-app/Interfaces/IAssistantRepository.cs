using Microsoft.AspNetCore.Identity;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IAssistantRepository
    {
        Task<IEnumerable<Assistant>> GetAssistantsAsync(string sortOrder, string searchString, int pageNumber, int pageSize);
        Task<Assistant> GetAssistantByIdAsync(int id);
        Task<IdentityResult> CreateAssistantAsync(Assistant assistant, ApplicationUser user);
        Task<IEnumerable<Professor>> GetAllProfessorsAsync();
        Task UpdateAssistantAsync(Assistant assistant);
        Task DeleteAssistantAsync(int id);
        Task<bool> AssistantExistsAsync(int id);
    }
}
