using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff ")]
    public class AcStaffsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AcStaffsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: AcStaffs
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

            var applicationDbContext = _context.AcStaffs.Include(a => a.Branch);

            var acstaff = from a in _context.AcStaffs
                          select a;

            if (!String.IsNullOrEmpty(searchString))
            {
                acstaff = acstaff.Where(a => a.Name.Contains(searchString)
                                       || a.Surname.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "Name":
                    acstaff = acstaff.OrderBy(p => p.Name);
                    break;
                case "name_desc":
                    acstaff = acstaff.OrderByDescending(p => p.Name);
                    break;
                case "Surname":
                    acstaff = acstaff.OrderBy(p => p.Surname);
                    break;
                case "surname_desc":
                    acstaff = acstaff.OrderByDescending(p => p.Surname);
                    break;
                case "HireDate":
                    acstaff = acstaff.OrderBy(p => p.HireDate);
                    break;
                case "hiredate_desc":
                    acstaff = acstaff.OrderByDescending(p => p.HireDate);
                    break;
                case "BirthDate":
                    acstaff = acstaff.OrderBy(p => p.BirthDate);
                    break;
                case "birthdate_desc":
                    acstaff = acstaff.OrderByDescending(p => p.BirthDate);
                    break;
                default:
                    acstaff = acstaff.OrderBy(p => p.Name);
                    break;
            }
            int pageSize = 5;
            return View(await PaginatedList<AcStaff>.CreateAsync(acstaff.Include(p => p.Branch).AsNoTracking(), pageNumber ?? 1, pageSize));
        }

        // GET: AcStaffs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.AcStaffs == null)
            {
                return NotFound();
            }

            var acStaff = await _context.AcStaffs
                .Include(a => a.Branch)
                .FirstOrDefaultAsync(m => m.AcStaffID == id);
            if (acStaff == null)
            {
                return NotFound();
            }

            return View(acStaff);
        }

        // GET: AcStaffs/Create
        public IActionResult Create()
        {
            ViewData["BranchID"] = new SelectList(_context.Branches, "BranchID", "Name");
            return View();
        }

        // POST: AcStaffs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AcStaffID,Name,Surname,Email,BirthDate,HireDate,Address,BranchID")] AcStaff acStaff)
        {
            var user = new ApplicationUser { UserName = acStaff.Email, FirstName = acStaff.Name, LastName = acStaff.Surname, Email = acStaff.Email };
            var result = await _userManager.CreateAsync(user, "Password.123");


            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Academic Staff");

                _context.Add(acStaff);
                await _context.SaveChangesAsync();

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
            if (id == null || _context.AcStaffs == null)
            {
                return NotFound();
            }

            var acStaff = await _context.AcStaffs.FindAsync(id);
            if (acStaff == null)
            {
                return NotFound();
            }
            ViewData["BranchID"] = new SelectList(_context.Branches, "BranchID", "Name", acStaff.BranchID);
            return View(acStaff);
        }

        // POST: AcStaffs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
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
                    _context.Update(acStaff);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AcStaffExists(acStaff.AcStaffID))
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
            ViewData["BranchID"] = new SelectList(_context.Branches, "BranchID", "Name", acStaff.BranchID);
            return View(acStaff);
        }

        // GET: AcStaffs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.AcStaffs == null)
            {
                return NotFound();
            }

            var acStaff = await _context.AcStaffs
                .Include(a => a.Branch)
                .FirstOrDefaultAsync(m => m.AcStaffID == id);
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
            if (_context.AcStaffs == null)
            {
                return Problem("Entity set 'ApplicationDbContext.AcStaffs'  is null.");
            }
            var acStaff = await _context.AcStaffs.FindAsync(id);
            if (acStaff != null)
            {
                _context.AcStaffs.Remove(acStaff);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AcStaffExists(int id)
        {
            return _context.AcStaffs.Any(e => e.AcStaffID == id);
        }
    }
}
