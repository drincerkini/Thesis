using System.Data;
using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Professor ")]
    public class AssistantsController : Controller
    {
        private readonly IAssistantRepository _assistantRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public AssistantsController(IAssistantRepository assistantRepository, UserManager<ApplicationUser> userManager)
        {
            _assistantRepository = assistantRepository;
            _userManager = userManager;
        }

        // GET: Assistants
        [AllowAnonymous]
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
            ViewData["CurrentSort"] = sortOrder;
            ViewData["NameSortParm"] = sortOrder == "Name" ? "name_desc" : "Name";
            ViewData["SurnameSortParm"] = sortOrder == "Surname" ? "surname_desc" : "Surname";
            ViewData["HireDateSortParm"] = sortOrder == "HireDate" ? "hiredate_desc" : "HireDate";
            ViewData["BirthDateSortParm"] = sortOrder == "BirthDate" ? "birthdate_desc" : "BirthDate";

            if (searchString != null)
            {
                pageNumber = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            ViewData["CurrentFilter"] = searchString;

            int pageSize = 5;
            var assistants = await _assistantRepository.GetAssistantsAsync(sortOrder, searchString, pageNumber ?? 1, pageSize);

            return View(assistants);
        }

        // GET: Assistants/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var assistant = await _assistantRepository.GetAssistantByIdAsync(id.Value);
            if (assistant == null)
            {
                return NotFound();
            }

            return View(assistant);
        }

        // GET: Assistants/Create
        public async Task<IActionResult> Create()
        {
            var professors = await _assistantRepository.GetAllProfessorsAsync();
            ViewData["ProfessorID"] = new SelectList(professors, "ProfessorID", "FullName");
            return View();
        }

        // POST: Assistants/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AssistantID,Name,Surname,Email,BirthDate,HireDate,Address,ProfessorID")] Assistant assistant)
        {
            var user = new ApplicationUser
            {
                UserName = assistant.Email,
                FirstName = assistant.Name,
                LastName = assistant.Surname,
                Email = assistant.Email
            };

            var result = await _assistantRepository.CreateAssistantAsync(assistant, user);

            if (result.Succeeded)
            {
                return RedirectToAction(nameof(Index));
            }

            // If there are errors, display them
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            // Populate the ProfessorID dropdown for the view
            var professors = await _assistantRepository.GetAllProfessorsAsync();
            ViewData["ProfessorID"] = new SelectList(professors, "ProfessorID", "FullName", assistant.ProfessorID);
            return View(assistant);
        }



        // GET: Assistants/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var assistant = await _assistantRepository.GetAssistantByIdAsync(id.Value);
            if (assistant == null)
            {
                return NotFound();
            }

            // Populate the ProfessorID dropdown
            var professors = await _assistantRepository.GetAllProfessorsAsync();
            ViewData["ProfessorID"] = new SelectList(professors, "ProfessorID", "FullName", assistant.ProfessorID);
            return View(assistant);
        }

        // POST: Assistants/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AssistantID,Name,Surname,Email,BirthDate,HireDate,Address,ProfessorID")] Assistant assistant)
        {
            if (id != assistant.AssistantID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _assistantRepository.UpdateAssistantAsync(assistant);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await AssistantExists(assistant.AssistantID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }

            // Populate the ProfessorID dropdown if the model state is invalid
            var professors = await _assistantRepository.GetAllProfessorsAsync();
            ViewData["ProfessorID"] = new SelectList(professors, "ProfessorID", "FullName", assistant.ProfessorID);
            return View(assistant);
        }

        // GET: Assistants/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var assistant = await _assistantRepository.GetAssistantByIdAsync(id.Value);
            if (assistant == null)
            {
                return NotFound();
            }

            return View(assistant);
        }

        // POST: Assistants/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var assistant = await _assistantRepository.GetAssistantByIdAsync(id);
            if (assistant != null)
            {
                // Retrieve the ApplicationUser linked to the assistant
                var user = await _userManager.FindByIdAsync(assistant.ApplicationUserId);

                // If the user exists, delete the ApplicationUser
                if (user != null)
                {
                    var result = await _userManager.DeleteAsync(user);
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                        return View(assistant); // Return the view if user deletion fails
                    }
                }

                // Remove the assistant using the repository
                await _assistantRepository.DeleteAssistantAsync(id);
            }

            return RedirectToAction(nameof(Index));
        }

        private async Task<bool> AssistantExists(int id)
        {
            return await _assistantRepository.AssistantExistsAsync(id);
        }
    }
}
