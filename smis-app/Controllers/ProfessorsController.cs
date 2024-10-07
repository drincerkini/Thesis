using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Professor")]
    public class ProfessorsController : Controller
    {
        private readonly IProfessorRepository _professorRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfessorsController(IProfessorRepository professorRepository, UserManager<ApplicationUser> userManager)
        {
            _professorRepository = professorRepository;
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

            int pageSize = 5;
            var professors = await _professorRepository.GetAllProfessorsAsync(sortOrder, searchString, pageNumber ?? 1, pageSize);
            return View(professors);
        }

        // GET: Professors/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var professor = await _professorRepository.GetProfessorByIdAsync(id.Value);
            if (professor == null)
            {
                return NotFound();
            }

            return View(professor);
        }

        // GET: Professors/Create
        public async Task<IActionResult> Create()
        {
            ViewData["DepartmentID"] = new SelectList(await _professorRepository.GetDepartmentsAsync(), "DepartmentID", "Name");
            return View();
        }

        // POST: Professors/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProfessorID,Name,Surname,Email,BirthDate,HireDate,Address,DepartmentID")] Professor professor)
        {
            var user = new ApplicationUser
            {
                UserName = professor.Email,
                Email = professor.Email,
                FirstName = professor.Name,
                LastName = professor.Surname
            };

            var result = await _userManager.CreateAsync(user, "Password.123");

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Professor");
                professor.ApplicationUserId = user.Id;
                await _professorRepository.CreateProfessorAsync(professor);
                return RedirectToAction(nameof(Index));
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            ViewData["DepartmentID"] = new SelectList(await _professorRepository.GetDepartmentsAsync(), "DepartmentID", "Name", professor.DepartmentID); // Use repository method here
            return View(professor);
        }

        // GET: Professors/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var professor = await _professorRepository.GetProfessorByIdAsync(id.Value);
            if (professor == null)
            {
                return NotFound();
            }

            ViewData["DepartmentID"] = new SelectList(await _professorRepository.GetDepartmentsAsync(), "DepartmentID", "Name", professor.DepartmentID); // Use repository method here
            return View(professor);
        }

        // POST: Professors/Edit/5
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
                    await _professorRepository.UpdateProfessorAsync(professor);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _professorRepository.ProfessorExistsAsync(professor.ProfessorID))
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

            ViewData["DepartmentID"] = new SelectList(await _professorRepository.GetDepartmentsAsync(), "DepartmentID", "Name", professor.DepartmentID); // Use repository method here
            return View(professor);
        }

        // GET: Professors/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var professor = await _professorRepository.GetProfessorByIdAsync(id.Value);
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
            await _professorRepository.DeleteProfessorAsync(id);
            return RedirectToAction(nameof(Index));
        }

        //other methods apart from CRUD

        [AllowAnonymous]
        public async Task<IActionResult> ProfAssistList(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var assistants = await _professorRepository.GetAssistantsByProfessorIdAsync(id.Value);
            return View(assistants);
        }

        [Authorize(Roles = "Professor")]
        public async Task<IActionResult> MyCourses()
        {
            var userEmail = User.Identity.Name;

            var professor = await _professorRepository.GetProfessorByEmailAsync(userEmail);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            var courses = await _professorRepository.GetCoursesByProfessorIdAsync(professor.ProfessorID);
            return View(courses);
        }

        [Authorize(Roles = "Professor")]
        public async Task<IActionResult> CourseStudents(int id)
        {
            var userEmail = User.Identity.Name;

            var professor = await _professorRepository.GetProfessorByEmailAsync(userEmail);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            var course = await _professorRepository.GetCourseByIdAndProfessorIdAsync(id, professor.ProfessorID);
            if (course == null)
            {
                return NotFound("Course not found or you do not teach this course.");
            }

            var gradedStudentIds = await _professorRepository.GetGradedStudentIdsAsync(id);
            var students = course.Enrollments
                .Where(e => !gradedStudentIds.Contains(e.StudentId))
                .Select(e => e.Student)
                .ToList();

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

            var professor = await _professorRepository.GetProfessorByEmailAsync(userEmail);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            var course = await _professorRepository.GetCourseByIdAndProfessorIdAsync(courseId, professor.ProfessorID);
            if (course == null)
            {
                return NotFound("You are not teaching this course.");
            }

            await _professorRepository.SaveOrUpdateGradeAsync(studentId, courseId, score, professor.ProfessorID);
            await _professorRepository.AddNotificationForStudentAsync(studentId, course.CourseName, score);

            return RedirectToAction("CourseStudents", new { id = courseId });
        }

        [Authorize(Roles = "Professor")]
        public async Task<IActionResult> GradedStudents()
        {
            var userEmail = User.Identity.Name;

            var professor = await _professorRepository.GetProfessorByEmailAsync(userEmail);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            var gradedStudents = await _professorRepository.GetGradedStudentsByProfessorIdAsync(professor.ProfessorID);
            return View(gradedStudents);
        }

        [HttpPost]
        [Authorize(Roles = "Professor")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RemoveGrade(int gradeId)
        {
            var result = await _professorRepository.RemoveGradeAsync(gradeId);
            if (!result)
            {
                return NotFound("Grade not found.");
            }

            return RedirectToAction("GradedStudents");
        }

        // controller to show the list of the courses tought by the professor
        [AllowAnonymous]
        public async Task<IActionResult> Courses(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var courses = await _professorRepository.GetCoursesByProfessorIdAsync(id.Value);
            return View(courses);
        }

    }
}
