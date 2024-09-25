using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Admin, Academic Staff, Professor ")]

    public class ProfessorsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;


        public ProfessorsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [AllowAnonymous]
        // GET: Professors
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


                var professors = from p in _context.Professors
                                 select p;

                if (!String.IsNullOrEmpty(searchString))
                {
                    professors = professors.Where(p => p.Name.Contains(searchString)
                                           || p.Surname.Contains(searchString));
                }

                switch (sortOrder)
                {
                    case "Name":
                        professors = professors.OrderBy(p => p.Name);
                        break;
                    case "name_desc":
                        professors = professors.OrderByDescending(p => p.Name);
                        break;
                    case "Surname":
                        professors = professors.OrderBy(p => p.Surname);
                        break;
                    case "surname_desc":
                        professors = professors.OrderByDescending(p => p.Surname);
                        break;
                    case "HireDate":
                        professors = professors.OrderBy(p => p.HireDate);
                        break;
                    case "hiredate_desc":
                        professors = professors.OrderByDescending(p => p.HireDate);
                        break;
                    case "BirthDate":
                        professors = professors.OrderBy(p => p.BirthDate);
                        break;
                    case "birthdate_desc":
                        professors = professors.OrderByDescending(p => p.BirthDate);
                        break;
                    default:
                        professors = professors.OrderBy(p => p.Name);
                        break;
                }

                int pageSize = 5;
                return View(await PaginatedList<Professor>.CreateAsync(professors.Include(p => p.Department).AsNoTracking(), pageNumber ?? 1, pageSize));
            }
        }
        // GET: Professors/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Professors == null)
            {
                return NotFound();
            }

            var professor = await _context.Professors
                .Include(p => p.Department)
                .FirstOrDefaultAsync(m => m.ProfessorID == id);
            if (professor == null)
            {
                return NotFound();
            }

            return View(professor);
        }

        // GET: Professors/Create
        public IActionResult Create()
        {
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name");
            return View();
        }

        // POST: Professors/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProfessorID,Name,Surname,Email,BirthDate,HireDate,Address,DepartmentID")] Professor professor)
        {
            var user = new ApplicationUser { UserName = professor.Email, FirstName = professor.Name, LastName = professor.Surname, Email = professor.Email };
            var result = await _userManager.CreateAsync(user, "Password.123");


            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Professor");

                _context.Add(professor);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name", professor.DepartmentID);
            return View(professor);
        }


        // GET: Professors/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Professors == null)
            {
                return NotFound();
            }

            var professor = await _context.Professors.FindAsync(id);
            if (professor == null)
            {
                return NotFound();
            }
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name", professor.DepartmentID);
            return View(professor);
        }

        // POST: Professors/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ProfessorID,Name,Surname,Email,BirthDate,HireDate,Address,DepartmentID")] Professor professor)
        {
            if (id != professor.ProfessorID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(professor);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProfessorExists(professor.ProfessorID))
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
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name", professor.DepartmentID);
            return View(professor);
        }

        // GET: Professors/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Professors == null)
            {
                return NotFound();
            }

            var professor = await _context.Professors
                .Include(p => p.Department)
                .FirstOrDefaultAsync(m => m.ProfessorID == id);
            if (professor == null)
            {
                return NotFound();
            }

            return View(professor);
        }

        // POST: Professors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Professors == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Professors'  is null.");
            }
            var professor = await _context.Professors.FindAsync(id);
            if (professor != null)
            {
                _context.Professors.Remove(professor);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProfessorExists(int id)
        {
            return _context.Professors.Any(e => e.ProfessorID == id);
        }
        [AllowAnonymous]
        public async Task<IActionResult> ProfAssistList(int? id)
        {
            var assistants = await _context.Assistants
                .Where(a => a.ProfessorID == id)
                .ToListAsync();

            return View(assistants);
        }

        [Authorize(Roles = "Professor")]
        public async Task<IActionResult> MyCourses()
        {
            // Get the current logged-in user
            var userEmail = User.Identity.Name;

            // Find the professor associated with this email
            var professor = await _context.Professors
                                          .Include(p => p.Courses) // Include courses that the professor teaches
                                          .FirstOrDefaultAsync(p => p.Email == userEmail);

            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            // Get the courses taught by this professor
            var courses = await _context.Courses
                                        .Where(c => c.ProfessorId == professor.ProfessorID)
                                        .Include(c => c.Department) // Include the department for more context
                                        .ToListAsync();

            // Pass the professor's courses to the view
            return View(courses);
        }


        [Authorize(Roles = "Professor")]
        public async Task<IActionResult> CourseStudents(int id)
        {
            // Get the current logged-in user
            var userEmail = User.Identity.Name;

            // Find the professor associated with this email
            var professor = await _context.Professors
                                          .FirstOrDefaultAsync(p => p.Email == userEmail);

            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            // Verify the course belongs to the professor
            var course = await _context.Courses
                                       .Include(c => c.Enrollments)
                                       .ThenInclude(e => e.Student)
                                       .FirstOrDefaultAsync(c => c.CourseId == id && c.ProfessorId == professor.ProfessorID);

            if (course == null)
            {
                return NotFound("Course not found or you do not teach this course.");
            }

            // Pass the list of students and course details to the view
            ViewBag.CourseId = course.CourseId;
            ViewBag.ProfessorId = professor.ProfessorID;

            var students = course.Enrollments.Select(e => e.Student).ToList();
            return View(students);
        }

        [HttpPost]
        [Authorize(Roles = "Professor")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GradeStudent(int studentId, int courseId, int score)
        {
            // Get the current logged-in user
            var userEmail = User.Identity.Name;

            // Find the professor associated with this email
            var professor = await _context.Professors
                                          .FirstOrDefaultAsync(p => p.Email == userEmail);

            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            // Ensure the professor teaches the course
            var course = await _context.Courses
                                       .FirstOrDefaultAsync(c => c.CourseId == courseId && c.ProfessorId == professor.ProfessorID);

            if (course == null)
            {
                return NotFound("You are not teaching this course.");
            }

            // Check if a grade already exists for the student in this course
            var existingGrade = await _context.Grades
                                              .FirstOrDefaultAsync(g => g.StudentId == studentId && g.CourseId == courseId);

            if (existingGrade != null)
            {
                // Update the existing grade
                existingGrade.Score = score;
                _context.Update(existingGrade);
            }
            else
            {
                // Assign a new grade
                var grade = new Grade
                {
                    StudentId = studentId,
                    CourseId = courseId,
                    Score = score,
                    ProfessorId = professor.ProfessorID,
                    DateGraded = DateTime.Now
                };

                _context.Grades.Add(grade);
            }

            await _context.SaveChangesAsync();

            // Redirect back to the CourseStudents page
            return RedirectToAction("CourseStudents", new { id = courseId });
        }


    }


}
