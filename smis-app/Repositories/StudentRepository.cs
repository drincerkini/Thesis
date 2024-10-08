using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Student> GetStudentByEmailAsync(string email)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.Email == email);
        }

        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _context.Students.Include(s => s.Department).FirstOrDefaultAsync(s => s.StudentID == id);
        }

        public async Task<List<Student>> GetAllStudentsAsync(string searchString, string sortOrder, int pageNumber, int pageSize)
        {
            var students = from s in _context.Students select s;

            if (!string.IsNullOrEmpty(searchString))
            {
                students = students.Where(s => s.Name.Contains(searchString) || s.Surname.Contains(searchString));
            }

            students = sortOrder switch
            {
                "Name" => students.OrderBy(s => s.Name),
                "name_desc" => students.OrderByDescending(s => s.Name),
                "Surname" => students.OrderBy(s => s.Surname),
                "surname_desc" => students.OrderByDescending(s => s.Surname),
                "RegisterDate" => students.OrderBy(s => s.RegisterDate),
                "registerdate_desc" => students.OrderByDescending(s => s.RegisterDate),
                "BirthDate" => students.OrderBy(s => s.BirthDate),
                "birthdate_desc" => students.OrderByDescending(s => s.BirthDate),
                _ => students.OrderBy(s => s.Name),
            };

            return await PaginatedList<Student>.CreateAsync(students.Include(s => s.Department).AsNoTracking(), pageNumber, pageSize);
        }

        public async Task AddStudentAsync(Student student)
        {
            _context.Students.Add(student);
            await SaveChangesAsync();
        }

        public async Task UpdateStudentAsync(Student student)
        {
            _context.Students.Update(student);
            await SaveChangesAsync();
        }

        public async Task DeleteStudentAsync(int id)
        {
            var student = await GetStudentByIdAsync(id);
            if (student != null)
            {
                _context.Students.Remove(student);
                await SaveChangesAsync();
            }
        }

        public async Task<List<Grade>> GetGradesByStudentIdAsync(int studentId)
        {
            return await _context.Grades.Include(g => g.Course).Include(g => g.Professor)
                                         .Where(g => g.StudentId == studentId).ToListAsync();
        }



        public async Task<Enrollment> GetEnrollmentAsync(int studentId, int courseId)
        {
            return await _context.Enrollments
                                 .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);
        }

        public async Task<IEnumerable<Enrollment>> GetEnrolledCoursesAsync(int studentId)
        {
            return await _context.Enrollments
                .Include(e => e.Course) // Load the Course navigation property
                .ThenInclude(c => c.Professor) // Load the Professor navigation property
                .Where(e => e.StudentId == studentId)
                .ToListAsync();
        }

        public async Task RemoveEnrollmentAsync(int studentId, int courseId)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);

            if (enrollment != null)
            {
                _context.Enrollments.Remove(enrollment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddEnrollmentAsync(Enrollment enrollment)
        {
            _context.Enrollments.Add(enrollment);
            await SaveChangesAsync();
        }

        public async Task RemoveEnrollmentAsync(Enrollment enrollment)
        {
            _context.Enrollments.Remove(enrollment);
            await SaveChangesAsync();
        }

        public async Task<Grade> GetGradeAsync(int gradeId)
        {
            return await _context.Grades.FindAsync(gradeId);
        }

        public async Task<List<CourseWithProfessorViewModel>> GetCoursesWithProfessorsAsync()
        {
            return await _context.Courses
                .Include(c => c.Professor)
                .Select(c => new CourseWithProfessorViewModel
                {
                    CourseId = c.CourseId,
                    CourseAndProfessor = $"{c.CourseName} - {c.Professor.FullName}"
                })
                .ToListAsync();
        }


        public async Task DeleteGradeAsync(Grade grade)
        {
            _context.Grades.Remove(grade);
            await SaveChangesAsync();
        }

        public async Task<List<Notification>> GetUnreadNotificationsByStudentIdAsync(int studentId)
        {
            return await _context.Notifications
                                 .Where(n => n.StudentId == studentId && !n.IsRead)
                                 .OrderByDescending(n => n.DateCreated)
                                 .ToListAsync();
        }


        public async Task<List<Notification>> GetUnreadNotificationsAsync(int studentId)
        {
            return await _context.Notifications
                                 .Where(n => n.StudentId == studentId && !n.IsRead)
                                 .OrderByDescending(n => n.DateCreated)
                                 .ToListAsync();
        }

        public async Task<Notification> GetNotificationByIdAsync(int id)
        {
            return await _context.Notifications.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
