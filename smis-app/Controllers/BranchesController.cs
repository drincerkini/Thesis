using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff")]
    public class BranchesController : Controller
    {
        private readonly IBranchRepository _branchRepository;

        public BranchesController(IBranchRepository branchRepository)
        {
            _branchRepository = branchRepository;
        }

        [AllowAnonymous]
        // GET: Branches
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
            ViewData["CurrentSort"] = sortOrder;
            ViewData["NameSortParm"] = sortOrder == "Name" ? "name_desc" : "Name";
            ViewData["LocationSortParm"] = sortOrder == "Location" ? "location_desc" : "Location";

            if (searchString != null)
            {
                pageNumber = 1; // Reset page number if searching
            }
            else
            {
                searchString = currentFilter; // Maintain current filter
            }

            ViewData["CurrentFilter"] = searchString;

            int pageSize = 5;
            // Get branches from the repository as IEnumerable
            var branches = await _branchRepository.GetAllAsync(sortOrder, searchString, pageNumber ?? 1, pageSize);
            

            // Use PaginatedList to create the paginated result
            return View(branches);
        }


        // GET: Branches/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var branch = await _branchRepository.GetByIdAsync(id.Value);
            if (branch == null)
            {
                return NotFound();
            }

            return View(branch);
        }

        // GET: Branches/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Branches/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("BranchID,SMIAL,Name,Location")] Branch branch)
        {
            var depList = await _branchRepository.GetDepartmentsAsync();

            if (ModelState.IsValid)
            {
                // First, save the branch to get the generated BranchID
                await _branchRepository.CreateAsync(branch);

                // Now, associate the departments with the newly created branch
                if (depList != null)
                {
                    foreach (var item in depList)
                    {
                        var depBranch = new DeptBranch
                        {
                            BranchID = branch.BranchID,  // This now has the correct BranchID
                            DepartmentID = item.DepartmentID
                        };
                        await _branchRepository.CreateDeptBranchAsync(depBranch); // Use the new method here
                    }
                }

                return RedirectToAction(nameof(Index));
            }
            return View(branch);
        }


        // GET: Branches/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var branch = await _branchRepository.GetByIdAsync(id.Value);
            if (branch == null)
            {
                return NotFound();
            }
            return View(branch);
        }

        // POST: Branches/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("BranchID,SMIAL,Name,Location")] Branch branch)
        {
            if (id != branch.BranchID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _branchRepository.UpdateAsync(branch);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await BranchExists(branch.BranchID))
                    {
                        return NotFound();
                    }
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(branch);
        }

        // GET: Branches/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var branch = await _branchRepository.GetByIdAsync(id.Value);
            if (branch == null)
            {
                return NotFound();
            }

            return View(branch);
        }

        // POST: Branches/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _branchRepository.DeleteAsync(id);
            return RedirectToAction(nameof(Index));
        }

        private async Task<bool> BranchExists(int id)
        {
            return await _branchRepository.BranchExistsAsync(id);
        }

        [AllowAnonymous]
        public async Task<IActionResult> BranchDeptList(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var branch = await _branchRepository.GetByIdAsync(id.Value);
            if (branch == null)
            {
                return NotFound();
            }

            return View(branch);
        }
    }
}
