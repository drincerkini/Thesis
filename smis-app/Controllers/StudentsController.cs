using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;
using System.Text;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Kernel.Colors;
using SchoolManagmentSystem.Repositories;
using SchoolManagmentSystem.Interfaces;

namespace SchoolManagmentSystem.Controllers
{
    [Authorize(Roles = "Super Admin, Academic Staff, Student")]
    public class StudentsController : Controller
    {
        private readonly IStudentRepository _studentRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public StudentsController(IStudentRepository studentRepository, UserManager<ApplicationUser> userManager)
        {
            _studentRepository = studentRepository;
            _userManager = userManager;
        }

        public async Task<IActionResult> MyTranscript()
        {
            var userEmail = User.Identity.Name;
            var student = await _studentRepository.GetStudentByEmailAsync(userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var grades = await _studentRepository.GetGradesByStudentIdAsync(student.StudentID);
            ViewBag.StudentName = $"{student.Name} {student.Surname}";

            var notifications = await _studentRepository.GetUnreadNotificationsAsync(student.StudentID);
            ViewBag.Notifications = notifications;

            return View(grades);
        }

        [HttpPost]
        public async Task<IActionResult> RemoveGrade(int gradeId)
        {
            var userEmail = User.Identity.Name;
            var student = await _studentRepository.GetStudentByEmailAsync(userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var grade = await _studentRepository.GetGradeAsync(gradeId);
            if (grade == null || grade.StudentId != student.StudentID)
            {
                return NotFound("Grade not found.");
            }

            var enrollment = await _studentRepository.GetEnrollmentAsync(student.StudentID, grade.CourseId);
            if (enrollment == null)
            {
                return NotFound("Enrollment not found.");
            }

            // Remove the enrollment and grade using the repository methods
            await _studentRepository.RemoveEnrollmentAsync(enrollment);
            await _studentRepository.DeleteGradeAsync(grade); // Create this method in the repository

            await _studentRepository.SaveChangesAsync();

            return RedirectToAction(nameof(MyTranscript));
        }

        public async Task<IActionResult> Enroll()
        {
            var coursesWithProfessors = await _studentRepository.GetCoursesWithProfessorsAsync();

            ViewBag.Courses = new SelectList(coursesWithProfessors, "CourseId", "CourseAndProfessor");

            return View();
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Enroll(int courseId)
        {
            var userEmail = User.Identity.Name;
            var student = await _studentRepository.GetStudentByEmailAsync(userEmail);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var existingEnrollment = await _studentRepository.GetEnrollmentAsync(student.StudentID, courseId);
            if (existingEnrollment != null)
            {
                ModelState.AddModelError(string.Empty, "You are already enrolled in this course.");
                return RedirectToAction(nameof(Enroll));
            }

            var enrollment = new Enrollment
            {
                CourseId = courseId,
                StudentId = student.StudentID
            };

            await _studentRepository.AddEnrollmentAsync(enrollment);

            return RedirectToAction(nameof(Index)); // Redirect to student's dashboard or course list
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index(string sortOrder, string searchString, string currentFilter, int? pageNumber)
        {
            ViewData["CurrentSort"] = sortOrder;
            ViewData["CurrentFilter"] = searchString;

            var students = await _studentRepository.GetAllStudentsAsync(searchString, sortOrder, pageNumber ?? 1, 5);
            return View(students);
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _studentRepository.GetStudentByIdAsync(id.Value);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Student student)
        {
            if (ModelState.IsValid)
            {
                await _studentRepository.AddStudentAsync(student);
                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _studentRepository.GetStudentByIdAsync(id.Value);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Student student)
        {
            if (id != student.StudentID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                await _studentRepository.UpdateStudentAsync(student);
                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _studentRepository.GetStudentByIdAsync(id.Value);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _studentRepository.DeleteStudentAsync(id);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Notifications()
        {
            var userEmail = User.Identity.Name;

            var student = await _studentRepository.GetStudentByEmailAsync(userEmail);
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var notifications = await _studentRepository.GetUnreadNotificationsAsync(student.StudentID);

            return View(notifications);
        }

        [HttpPost]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _studentRepository.GetNotificationByIdAsync(id);
            if (notification == null)
            {
                return NotFound("Notification not found.");
            }

            notification.IsRead = true;
            await _studentRepository.SaveChangesAsync();

            return Ok();
        }



        public async Task<IActionResult> DownloadTranscript()
        {
            // Get the current logged-in user's email
            var userEmail = User.Identity.Name;

            // Find the student associated with this email using the repository
            var student = await _studentRepository.GetStudentByEmailAsync(userEmail);
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            // Get the grades for the student using the repository
            var grades = await _studentRepository.GetGradesByStudentIdAsync(student.StudentID);

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
                var fileName = $"Transcript_{student.StudentID}.pdf";
                byte[] fileBytes = memoryStream.ToArray();
                return File(fileBytes, "application/pdf", fileName);
            }
        }

    }
}
