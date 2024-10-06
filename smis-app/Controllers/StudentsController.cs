using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;
using System.Text;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Kernel.Colors;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Student")]

    public class StudentsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public StudentsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IActionResult> MyTranscript()
        {
            // Get the current logged-in user email
            var userEmail = User.Identity.Name;

            // Find the student associated with this email
            var student = await _context.Students
                                        .FirstOrDefaultAsync(s => s.Email == userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            // Get the grades for the student
            var grades = await _context.Grades
                                       .Include(g => g.Course)
                                       .Include(g => g.Professor)
                                       .Where(g => g.StudentId == student.StudentID)
                                       .ToListAsync();

            // Pass the student's transcript to the view
            ViewBag.StudentName = student.Name + " " + student.Surname;

            // Get unread notifications for the student
            var notifications = await _context.Notifications
                                               .Where(n => n.StudentId == student.StudentID && !n.IsRead)
                                               .ToListAsync();
            ViewBag.Notifications = notifications;

            return View(grades);
        }


        [HttpPost]
        public async Task<IActionResult> RemoveGrade(int gradeId)
        {
            // Get the current logged-in user's email
            var userEmail = User.Identity.Name;

            // Find the student associated with this email
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Email == userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            // Find the grade associated with the student
            var grade = await _context.Grades.FirstOrDefaultAsync(g => g.GradeId == gradeId && g.StudentId == student.StudentID);

            if (grade == null)
            {
                return NotFound("Grade not found.");
            }

            // Find the enrollment entry for the student and course (if exists)
            var enrollment = await _context.Enrollments
                                           .FirstOrDefaultAsync(e => e.StudentId == student.StudentID && e.CourseId == grade.CourseId);

            if (enrollment == null)
            {
                return NotFound("Enrollment not found.");
            }

            // Remove the grade
            _context.Grades.Remove(grade);

            // Remove the enrollment from the course
            _context.Enrollments.Remove(enrollment);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Redirect back to the transcript page
            return RedirectToAction(nameof(MyTranscript));
        }


        public IActionResult Enroll()
        {
            var coursesWithProfessors = _context.Courses
                .Include(c => c.Professor)
                .Select(c => new
                {
                    c.CourseId,
                    CourseAndProfessor = c.CourseName + " - " + c.Professor.FullName
                })
                .ToList();

            ViewBag.Courses = new SelectList(coursesWithProfessors, "CourseId", "CourseAndProfessor");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Enroll(int courseId)
        {
            // Get the current logged-in user
            var userEmail = User.Identity.Name;

            // Find the student associated with this email
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Email == userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            // Check if the student is already enrolled in the course
            var existingEnrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == courseId && e.StudentId == student.StudentID);

            if (existingEnrollment != null)
            {
                ModelState.AddModelError(string.Empty, "You are already enrolled in this course.");
                return RedirectToAction(nameof(Enroll));
            }

            // Create new enrollment
            var enrollment = new Enrollment
            {
                CourseId = courseId,
                StudentId = student.StudentID
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index)); // Redirect to student's dashboard or course list
        }



        [AllowAnonymous]
        // GET: Students
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
            
            ViewData["CurrentSort"] = sortOrder;
            ViewData["NameSortParm"] = sortOrder == "Name" ? "name_desc" : "Name";
            ViewData["SurnameSortParm"] = sortOrder == "Surname" ? "surname_desc" : "Surname";
            ViewData["RegisterDateSortParm"] = sortOrder == "RegisterDate" ? "registerdate_desc" : "RegisterDate";
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

            var students = from s in _context.Students
                            select s;

            if (!String.IsNullOrEmpty(searchString))
            {
                students = students.Where(s => s.Name.Contains(searchString)
                                        || s.Surname.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "Name":
                    students = students.OrderBy(s => s.Name);
                    break;
                case "name_desc":
                    students = students.OrderByDescending(s => s.Name);
                    break;
                case "Surname":
                    students = students.OrderBy(s => s.Surname);
                    break;
                case "surname_desc":
                    students = students.OrderByDescending(s => s.Surname);
                    break;
                case "RegisterDate":
                    students = students.OrderBy(s => s.RegisterDate);
                    break;
                case "registerdate_desc":
                    students = students.OrderByDescending(s => s.RegisterDate);
                    break;
                case "BirthDate":
                    students = students.OrderBy(s => s.BirthDate);
                    break;
                case "birthdate_desc":
                    students = students.OrderByDescending(s => s.BirthDate);
                    break;
                default:
                    students = students.OrderBy(s => s.Name);
                    break;
            }

            int pageSize = 5;
            return View(await PaginatedList<Student>.CreateAsync(students.Include(s => s.Department).AsNoTracking(), pageNumber ?? 1, pageSize));
            
        }

        // GET: Students/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Students == null)
            {
                return NotFound();
            }

            var student = await _context.Students
                .Include(m => m.Department)
                .FirstOrDefaultAsync(m => m.StudentID == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        // GET: Students/Create
        public IActionResult Create()
        {
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name");
            return View();
        }

        // POST: Students/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("StudentID,Name,Surname,Email,BirthDate,RegisterDate,Address,DepartmentID")] Student student)
        {
            // Create a new ApplicationUser for the student
            var user = new ApplicationUser
            {
                UserName = student.Email,
                FirstName = student.Name,
                LastName = student.Surname,
                Email = student.Email
            };

            // Create the user with a strong password
            var result = await _userManager.CreateAsync(user, "Password.123"); // Stronger password policy recommended

            if (result.Succeeded)
            {
                // Assign the student role to the user
                await _userManager.AddToRoleAsync(user, "Student");

                // Link the student with the newly created user
                student.ApplicationUserId = user.Id; // Make sure you have this property in your Student model

                // Save the student to the database
                _context.Add(student);
                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }

            // If there are errors, display them
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            // Populate the DepartmentID dropdown for the view
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name", student.DepartmentID);
            return View(student);
        }


        // GET: Students/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Students == null)
            {
                return NotFound();
            }

            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            ViewData["DepartmentID"] = new SelectList(_context.Departments, "DepartmentID", "Name", student.DepartmentID);
            return View(student);
        }

        // POST: Students/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("StudentID,Name,Surname,Email,BirthDate,RegisterDate,Address,DepartmentID")] Student student)
        {
            if (id != student.StudentID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(student);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StudentExists(student.StudentID))
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
            return View(student);
        }

        // GET: Students/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Students == null)
            {
                return NotFound();
            }

            var student = await _context.Students
                .FirstOrDefaultAsync(m => m.StudentID == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Students == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Students' is null.");
            }

            // Find the student by ID
            var student = await _context.Students.FindAsync(id);
            if (student != null)
            {
                // Retrieve the ApplicationUser linked to the student
                var user = await _userManager.FindByIdAsync(student.ApplicationUserId);

                // If the user exists, delete the ApplicationUser
                if (user != null)
                {
                    var result = await _userManager.DeleteAsync(user);
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                        return View(student); // Return the view if user deletion fails
                    }
                }

                // Remove the student from the context
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.StudentID == id);
        }

        public async Task<IActionResult> Notifications()
        {
            var userEmail = User.Identity.Name;
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Email == userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var notifications = await _context.Notifications
                                              .Where(n => n.StudentId == student.StudentID && !n.IsRead)
                                              .OrderByDescending(n => n.DateCreated)
                                              .ToListAsync();

            return View(notifications);
        }
        [HttpPost]
        public IActionResult MarkAsRead(int id)
        {
            var notification = _context.Notifications.Find(id);
            if (notification == null)
            {
                return NotFound();
            }

            notification.IsRead = true;
            _context.SaveChanges();

            return Ok(); 
        }

        public async Task<IActionResult> DownloadTranscript()
        {
            // Get the current logged-in user email
            var userEmail = User.Identity.Name;

            // Find the student associated with this email
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Email == userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            // Get the grades for the student
            var grades = await _context.Grades
                                       .Include(g => g.Course)
                                       .Where(g => g.StudentId == student.StudentID)
                                       .ToListAsync();

            // Create a memory stream to hold the PDF data
            using (var memoryStream = new MemoryStream())
            {
                // Initialize the PDF writer and document
                PdfWriter writer = new PdfWriter(memoryStream);
                PdfDocument pdf = new PdfDocument(writer);
                Document document = new Document(pdf);

                // Add the title to the PDF document
                document.Add(new Paragraph($"Transcript for {student.Name} {student.Surname}")
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetFontSize(18));

                // Add a line separator using SolidLine
                LineSeparator ls = new LineSeparator(new SolidLine());
                document.Add(ls);

                // Create a table with 2 columns: "Course Name" and "Grade"
                Table table = new Table(2); // 2 columns

                // Set table width to 100% of the page width
                table.SetWidth(UnitValue.CreatePercentValue(100));

                // Add table headers
                table.AddHeaderCell(new Cell().Add(new Paragraph("Course Name"))
                                              .SetBackgroundColor(ColorConstants.LIGHT_GRAY)
                                              .SetTextAlignment(TextAlignment.CENTER)
                                              .SetBold());

                table.AddHeaderCell(new Cell().Add(new Paragraph("Grade"))
                                              .SetBackgroundColor(ColorConstants.LIGHT_GRAY)
                                              .SetTextAlignment(TextAlignment.CENTER)
                                              .SetBold());

                // Add data rows (Course Name and Grade)
                foreach (var grade in grades)
                {
                    table.AddCell(new Cell().Add(new Paragraph(grade.Course.CourseName)));
                    table.AddCell(new Cell().Add(new Paragraph(grade.Score.ToString())));
                }

                // Add the table to the document
                document.Add(table);

                // Close the document
                document.Close();

                // Return the PDF as a downloadable file
                byte[] fileBytes = memoryStream.ToArray();
                return File(fileBytes, "application/pdf", "Transcript.pdf");
            }
        }



    }
}
