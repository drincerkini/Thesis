using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Professor ")]
    public class AssistantsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AssistantsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [AllowAnonymous]

        // GET: Assistants
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
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


                var assistants = from a in _context.Assistants
                                 select a;

                if (!String.IsNullOrEmpty(searchString))
                {
                    assistants = assistants.Where(p => p.Name.Contains(searchString)
                                           || p.Surname.Contains(searchString));
                }

                switch (sortOrder)
                {
                    case "Name":
                        assistants = assistants.OrderBy(p => p.Name);
                        break;
                    case "name_desc":
                        assistants = assistants.OrderByDescending(p => p.Name);
                        break;
                    case "Surname":
                        assistants = assistants.OrderBy(p => p.Surname);
                        break;
                    case "surname_desc":
                        assistants = assistants.OrderByDescending(p => p.Surname);
                        break;
                    case "HireDate":
                        assistants = assistants.OrderBy(p => p.HireDate);
                        break;
                    case "hiredate_desc":
                        assistants = assistants.OrderByDescending(p => p.HireDate);
                        break;
                    case "BirthDate":
                        assistants = assistants.OrderBy(p => p.BirthDate);
                        break;
                    case "birthdate_desc":
                        assistants = assistants.OrderByDescending(p => p.BirthDate);
                        break;
                    default:
                        assistants = assistants.OrderBy(p => p.Name);
                        break;
                }
                int pageSize = 5;
                return View(await PaginatedList<Assistant>.CreateAsync(assistants.Include(a => a.Professor).AsNoTracking(), pageNumber ?? 1, pageSize));
            }
        }

        // GET: Assistants/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Assistants == null)
            {
                return NotFound();
            }

            var assistant = await _context.Assistants
                .Include(a => a.Professor)
                .FirstOrDefaultAsync(m => m.AssistantID == id);
            if (assistant == null)
            {
                return NotFound();
            }

            return View(assistant);
        }

        // GET: Assistants/Create
        public IActionResult Create()
        {
            ViewData["ProfessorID"] = new SelectList(_context.Professors, "ProfessorID", "FullName");
            return View();
        }

        // POST: Assistants/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AssistantID,Name,Surname,Email,BirthDate,HireDate,Address,ProfessorID")] Assistant assistant)
        {
            // Create a new ApplicationUser for the assistant
            var user = new ApplicationUser
            {
                UserName = assistant.Email,
                FirstName = assistant.Name,
                LastName = assistant.Surname,
                Email = assistant.Email
            };

            // Create the user with a strong password
            var result = await _userManager.CreateAsync(user, "Password.123"); // Stronger password policy recommended

            if (result.Succeeded)
            {
                // Assign the assistant role to the user
                await _userManager.AddToRoleAsync(user, "Assistant");

                // Link the assistant with the newly created user
                assistant.ApplicationUserId = user.Id; // Make sure you have this property in your Assistant model

                // Save the assistant to the database
                _context.Add(assistant);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            // If there are errors, display them
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            // Populate the ProfessorID dropdown for the view
            ViewData["ProfessorID"] = new SelectList(_context.Professors, "ProfessorID", "FullName", assistant.ProfessorID);
            return View(assistant);
        }



        // GET: Assistants/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Assistants == null)
            {
                return NotFound();
            }

            var assistant = await _context.Assistants.FindAsync(id);
            if (assistant == null)
            {
                return NotFound();
            }
            ViewData["ProfessorID"] = new SelectList(_context.Professors, "ProfessorID", "FullName", assistant.ProfessorID);
            return View(assistant);
        }

        // POST: Assistants/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
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
                    _context.Update(assistant);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AssistantExists(assistant.AssistantID))
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
            ViewData["ProfessorID"] = new SelectList(_context.Professors, "ProfessorID", "FullName", assistant.ProfessorID);
            return View(assistant);
        }

        // GET: Assistants/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Assistants == null)
            {
                return NotFound();
            }

            var assistant = await _context.Assistants
                .Include(a => a.Professor)
                .FirstOrDefaultAsync(m => m.AssistantID == id);
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
            if (_context.Assistants == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Assistants' is null.");
            }

            // Find the assistant by ID
            var assistant = await _context.Assistants.FindAsync(id);
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

                // Remove the assistant from the context
                _context.Assistants.Remove(assistant);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }


        private bool AssistantExists(int id)
        {
            return _context.Assistants.Any(e => e.AssistantID == id);
        }
    }
}
