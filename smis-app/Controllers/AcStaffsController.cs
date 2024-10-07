using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers {

    [Authorize(Roles = "Super Admin, Academic Staff ")]
    public class AcStaffsController : Controller
    {
        private readonly IAcStaffRepository _acStaffRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public AcStaffsController(IAcStaffRepository acStaffRepository, UserManager<ApplicationUser> userManager)
        {
            _acStaffRepository = acStaffRepository;
            _userManager = userManager;
        }

        // GET: AcStaffs
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
            ViewData["CurrentSort"] = sortOrder;
            ViewData["CurrentFilter"] = searchString ?? currentFilter;

            var acStaffList = await _acStaffRepository.GetAllAsync(sortOrder, searchString);
            return View(acStaffList);
        }

        // GET: AcStaffs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var acStaff = await _acStaffRepository.GetByIdAsync(id.Value);
            if (acStaff == null)
            {
                return NotFound();
            }

            return View(acStaff);
        }

        // GET: AcStaffs/Create
        public async Task<IActionResult> Create()
        {
            var branches = await _acStaffRepository.GetBranchesAsync();
            ViewData["BranchID"] = new SelectList(branches, "BranchID", "Name");
            return View();
        }

        // POST: AcStaffs/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AcStaffID,Name,Surname,Email,BirthDate,HireDate,Address,BranchID")] AcStaff acStaff)
        {
            var user = new ApplicationUser { UserName = acStaff.Email, FirstName = acStaff.Name, LastName = acStaff.Surname, Email = acStaff.Email };
            var result = await _userManager.CreateAsync(user, "Password.123");

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Academic Staff");
                await _acStaffRepository.CreateAsync(acStaff);
                await _acStaffRepository.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return View(acStaff);
        }

        // GET: AcStaffs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var acStaff = await _acStaffRepository.GetByIdAsync(id.Value);
            if (acStaff == null)
            {
                return NotFound();
            }

            var branches = await _acStaffRepository.GetBranchesAsync();
            ViewData["BranchID"] = new SelectList(branches, "BranchID", "Name", acStaff.BranchID);
            return View(acStaff);
        }

        // POST: AcStaffs/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("AcStaffID,Name,Surname,Email,BirthDate,HireDate,Address,BranchID")] AcStaff acStaff)
        {
            if (id != acStaff.AcStaffID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _acStaffRepository.UpdateAsync(acStaff);
                    await _acStaffRepository.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _acStaffRepository.ExistsAsync(acStaff.AcStaffID))
                    {
                        return NotFound();
                    }
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }

            var branches = await _acStaffRepository.GetBranchesAsync();
            ViewData["BranchID"] = new SelectList(branches, "BranchID", "Name", acStaff.BranchID);
            return View(acStaff);
        }

        // GET: AcStaffs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var acStaff = await _acStaffRepository.GetByIdAsync(id.Value);
            if (acStaff == null)
            {
                return NotFound();
            }

            return View(acStaff);
        }

        // POST: AcStaffs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _acStaffRepository.DeleteAsync(id);
            await _acStaffRepository.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }

}