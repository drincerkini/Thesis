
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    public class KomentisController : Controller
    {
        private readonly ApplicationDbContext _context;

        public KomentisController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Komentis
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Komenti.Include(k => k.Artikulli);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Komentis/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Komenti == null)
            {
                return NotFound();
            }

            var komenti = await _context.Komenti
                .Include(k => k.Artikulli)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (komenti == null)
            {
                return NotFound();
            }

            return View(komenti);
        }

        // GET: Komentis/Create
        public IActionResult Create()
        {
            ViewData["Article_ID"] = new SelectList(_context.Artikulli, "ID", "Name");
            return View();
        }

        // POST: Komentis/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Comment,Title,Article_ID")] Komenti komenti)
        {
            if (ModelState.IsValid)
            {
                _context.Add(komenti);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Article_ID"] = new SelectList(_context.Artikulli, "ID", "ID", komenti.Article_ID);
            return View(komenti);
        }

        // GET: Komentis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Komenti == null)
            {
                return NotFound();
            }

            var komenti = await _context.Komenti.FindAsync(id);
            if (komenti == null)
            {
                return NotFound();
            }
            ViewData["Article_ID"] = new SelectList(_context.Artikulli, "ID", "Name", komenti.Article_ID);
            return View(komenti);
        }

        // POST: Komentis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Comment,Title,Article_ID")] Komenti komenti)
        {
            if (id != komenti.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(komenti);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!KomentiExists(komenti.ID))
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
            ViewData["Article_ID"] = new SelectList(_context.Artikulli, "ID", "ID", komenti.Article_ID);
            return View(komenti);
        }

        // GET: Komentis/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Komenti == null)
            {
                return NotFound();
            }

            var komenti = await _context.Komenti
                .Include(k => k.Artikulli)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (komenti == null)
            {
                return NotFound();
            }

            return View(komenti);
        }

        // POST: Komentis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Komenti == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Komenti'  is null.");
            }
            var komenti = await _context.Komenti.FindAsync(id);
            if (komenti != null)
            {
                _context.Komenti.Remove(komenti);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool KomentiExists(int id)
        {
          return _context.Komenti.Any(e => e.ID == id);
        }
    }
}
