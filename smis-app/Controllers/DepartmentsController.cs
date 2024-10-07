using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff")]
    public class DepartmentsController : Controller
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentsController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        // GET: Departments
        [AllowAnonymous]
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
            ViewData["CurrentSort"] = sortOrder;
            ViewData["NameSortParm"] = sortOrder == "Name" ? "name_desc" : "Name";
            ViewData["CreatedDateParm"] = sortOrder == "CreatedDate" ? "createddate_desc" : "CreatedDate";

            if (searchString != null)
            {
                pageNumber = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            ViewData["CurrentFilter"] = searchString;

            var departments = await _departmentRepository.GetAllDepartmentsAsync(searchString, sortOrder);
            int pageSize = 5;

            return View(await PaginatedList<Department>.CreateAsync(departments, pageNumber ?? 1, pageSize)); // Use directly without AsQueryable
        }

        // GET: Departments/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var department = await _departmentRepository.GetDepartmentByIdAsync(id.Value);
            if (department == null)
            {
                return NotFound();
            }

            return View(department);
        }

        // GET: Departments/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Departments/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("DepartmentID,Name,CreatedDate")] Department department)
        {
            if (ModelState.IsValid)
            {
                await _departmentRepository.AddDepartmentAsync(department);
                return RedirectToAction(nameof(Index));
            }
            return View(department);
        }

        // GET: Departments/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var department = await _departmentRepository.GetDepartmentByIdAsync(id.Value);
            if (department == null)
            {
                return NotFound();
            }
            return View(department);
        }

        // POST: Departments/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("DepartmentID,Name,CreatedDate")] Department department)
        {
            if (id != department.DepartmentID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _departmentRepository.UpdateDepartmentAsync(department);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await DepartmentExists(department.DepartmentID))
                    {
                        return NotFound();
                    }
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(department);
        }

        // GET: Departments/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var department = await _departmentRepository.GetDepartmentByIdAsync(id.Value);
            if (department == null)
            {
                return NotFound();
            }

            return View(department);
        }

        // POST: Departments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _departmentRepository.DeleteDepartmentAsync(id);
            return RedirectToAction(nameof(Index));
        }

        private async Task<bool> DepartmentExists(int id)
        {
            return await _departmentRepository.GetDepartmentByIdAsync(id) != null;
        }

        [AllowAnonymous]
        public async Task<IActionResult> DepProfessorsList(int? id)
        {
            var professors = await _departmentRepository.GetProfessorsByDepartmentIdAsync(id);
            return View(professors);
        }

        [AllowAnonymous]
        public async Task<IActionResult> DepCoursesList(int? id)
        {
            var courses = await _departmentRepository.GetCoursesByDepartmentIdAsync(id);
            return View(courses);
        }

        [AllowAnonymous]
        public async Task<IActionResult> DepAssistantsList(int? id)
        {
            var assistants = await _departmentRepository.GetAssistantsByDepartmentIdAsync(id);
            return View(assistants);
        }
    }
}
