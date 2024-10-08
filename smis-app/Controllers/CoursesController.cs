using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Professor")]
    public class CoursesController : Controller
    {
        private readonly ICourseRepository _courseRepository;

        public CoursesController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        // GET: Courses
        public async Task<IActionResult> Index()
        {
            var courses = await _courseRepository.GetAllAsync();
            return View(courses);
        }

        // GET: Courses/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _courseRepository.GetByIdAsync(id.Value);
            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        // GET: Courses/Create
        public async Task<IActionResult> Create()
        {
            var departments = await _courseRepository.GetAllDepartmentsAsync();
            var professors = await _courseRepository.GetAllProfessorsAsync();

            ViewData["DepartmentID"] = new SelectList(departments, "DepartmentID", "Name");
            ViewData["ProfessorId"] = new SelectList(professors, "ProfessorID", "Email");

            return View();
        }

        // POST: Courses/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("CourseId,CourseName,DepartmentID,ProfessorId")] Course course)
        {
            if (ModelState.IsValid)
            {
                await _courseRepository.AddAsync(course);
                return RedirectToAction(nameof(Index));
            }

            var departments = await _courseRepository.GetAllDepartmentsAsync();
            var professors = await _courseRepository.GetAllProfessorsAsync();

            ViewData["DepartmentID"] = new SelectList(departments, "DepartmentID", "Name", course.DepartmentID);
            ViewData["ProfessorId"] = new SelectList(professors, "ProfessorID", "Email", course.ProfessorId);

            return View(course);
        }

        // GET: Courses/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _courseRepository.GetByIdAsync(id.Value);
            if (course == null)
            {
                return NotFound();
            }

            var departments = await _courseRepository.GetAllDepartmentsAsync();
            var professors = await _courseRepository.GetAllProfessorsAsync();

            ViewData["DepartmentID"] = new SelectList(departments, "DepartmentID", "Name", course.DepartmentID);
            ViewData["ProfessorId"] = new SelectList(professors, "ProfessorID", "Email", course.ProfessorId);

            return View(course);
        }

        // POST: Courses/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CourseId,CourseName,DepartmentID,ProfessorId")] Course course)
        {
            if (id != course.CourseId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _courseRepository.UpdateAsync(course);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _courseRepository.CourseExistsAsync(course.CourseId))
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

            var departments = await _courseRepository.GetAllDepartmentsAsync();
            var professors = await _courseRepository.GetAllProfessorsAsync();

            ViewData["DepartmentID"] = new SelectList(departments, "DepartmentID", "Name", course.DepartmentID);
            ViewData["ProfessorId"] = new SelectList(professors, "ProfessorID", "Email", course.ProfessorId);

            return View(course);
        }


        // GET: Courses/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var course = await _courseRepository.GetByIdAsync(id.Value);
            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        // POST: Courses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _courseRepository.DeleteAsync(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
