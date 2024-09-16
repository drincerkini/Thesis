using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    public class ArtikullisController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ArtikullisController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Artikullis
        public async Task<IActionResult> Index()
        {
              return View(await _context.Artikulli.ToListAsync());
        }

        // GET: Artikullis/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Artikulli == null)
            {
                return NotFound();
            }

            var artikulli = await _context.Artikulli
                .FirstOrDefaultAsync(m => m.ID == id);
            if (artikulli == null)
            {
                return NotFound();
            }

            return View(artikulli);
        }

        // GET: Artikullis/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Artikullis/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name,Title")] Artikulli artikulli)
        {
            if (ModelState.IsValid)
            {
                _context.Add(artikulli);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(artikulli);
        }

        // GET: Artikullis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Artikulli == null)
            {
                return NotFound();
            }

            var artikulli = await _context.Artikulli.FindAsync(id);
            if (artikulli == null)
            {
                return NotFound();
            }
            return View(artikulli);
        }

        // POST: Artikullis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,Title")] Artikulli artikulli)
        {
            if (id != artikulli.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(artikulli);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ArtikulliExists(artikulli.ID))
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
            return View(artikulli);
        }

        // GET: Artikullis/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Artikulli == null)
            {
                return NotFound();
            }

            var artikulli = await _context.Artikulli
                .FirstOrDefaultAsync(m => m.ID == id);
            if (artikulli == null)
            {
                return NotFound();
            }

            return View(artikulli);
        }

        // POST: Artikullis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Artikulli == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Artikulli'  is null.");
            }
            var artikulli = await _context.Artikulli.FindAsync(id);
            if (artikulli != null)
            {
                _context.Artikulli.Remove(artikulli);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ArtikulliExists(int id)
        {
          return _context.Artikulli.Any(e => e.ID == id);
        }
    }
}
