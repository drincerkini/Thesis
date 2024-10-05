using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Professor")]

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
            // Create a new ApplicationUser for the professor
            var user = new ApplicationUser
            {
                UserName = professor.Email,
                Email = professor.Email,
                FirstName = professor.Name,
                LastName = professor.Surname
            };

            var result = await _userManager.CreateAsync(user, "Password.123"); // Stronger password policy recommended

            if (result.Succeeded)
            {
                // Assign the professor role to the user
                await _userManager.AddToRoleAsync(user, "Professor");

                // Link the professor with the newly created user
                professor.ApplicationUserId = user.Id;

                // Save the professor to the database
                _context.Add(professor);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            // If there are errors, display them
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
            var professor = await _context.Professors.FindAsync(id);

            if (professor != null)
            {
                // Find the associated ApplicationUser
                var user = await _userManager.FindByIdAsync(professor.ApplicationUserId);

                if (user != null)
                {
                    // Delete the ApplicationUser
                    var result = await _userManager.DeleteAsync(user);

                    if (!result.Succeeded)
                    {
                        // Handle the error if deletion fails
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                        return View(professor);
                    }
                }

                // Delete the professor from the database
                _context.Professors.Remove(professor);
                await _context.SaveChangesAsync();
            }

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

            // Get the list of graded student IDs for this course
            var gradedStudentIds = await _context.Grades
                .Where(g => g.CourseId == id)
                .Select(g => g.StudentId)
                .ToListAsync();

            // Get the list of students who are enrolled but have not been graded
            var students = course.Enrollments
                                 .Where(e => !gradedStudentIds.Contains(e.StudentId)) // Filter out graded students
                                 .Select(e => e.Student)
                                 .ToList();

            // Pass the course details to the view
            ViewBag.CourseId = course.CourseId;
            ViewBag.ProfessorId = professor.ProfessorID;

            return View(students);
        }

        [HttpPost]
        [Authorize(Roles = "Professor")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GradeStudent(int studentId, int courseId, int score)
        {
            var userEmail = User.Identity.Name;

            var professor = await _context.Professors
                                          .FirstOrDefaultAsync(p => p.Email == userEmail);

            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            var course = await _context.Courses
                                       .FirstOrDefaultAsync(c => c.CourseId == courseId && c.ProfessorId == professor.ProfessorID);

            if (course == null)
            {
                return NotFound("You are not teaching this course.");
            }

            var existingGrade = await _context.Grades
                                              .FirstOrDefaultAsync(g => g.StudentId == studentId && g.CourseId == courseId);

            if (existingGrade != null)
            {
                existingGrade.Score = score;
                _context.Update(existingGrade);
            }
            else
            {
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

            var notification = new Notification
            {
                StudentId = studentId,
                Message = $"You have been graded for the course {course.CourseName}. Your new grade is {score}.",
                IsRead = false,
                DateCreated = DateTime.Now
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            // Fetch students enrolled in this course
            var studentsInCourse = await _context.Enrollments
                                                 .Where(e => e.CourseId == courseId)
                                                 .Select(e => e.Student) // Get the associated students
                                                 .ToListAsync();

            ViewBag.CourseName = course.CourseName;
            ViewBag.CourseId = courseId;

            // Redirect back to the CourseStudents page
            return RedirectToAction("CourseStudents", new { id = courseId });

        }



        [Authorize(Roles = "Professor")]
        public async Task<IActionResult> GradedStudents()
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

            // Retrieve all grades assigned by this professor
            var gradedStudents = await _context.Grades
                                               .Include(g => g.Student)
                                               .Include(g => g.Course)
                                               .Where(g => g.ProfessorId == professor.ProfessorID)
                                               .ToListAsync();

            // Pass the graded students to the view
            return View(gradedStudents);
        }

        [HttpPost]
        [Authorize(Roles = "Professor")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RemoveGrade(int gradeId)
        {
            // Find the grade to remove
            var grade = await _context.Grades.FindAsync(gradeId);
            if (grade == null)
            {
                return NotFound("Grade not found.");
            }

            // Remove the grade from the database
            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();

            return RedirectToAction("GradedStudents");
        }



    }
}
