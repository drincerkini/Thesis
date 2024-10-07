using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Data;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Repositories
{
    public class ProfessorRepository : IProfessorRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfessorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Professor> GetProfessorByIdAsync(int id)
        {
            return await _context.Professors
                .Include(p => p.Department)
                .FirstOrDefaultAsync(m => m.ProfessorID == id);
        }

        public async Task<IEnumerable<Professor>> GetAllProfessorsAsync(string sortOrder, string searchString, int pageNumber, int pageSize)
        {
            var professors = from p in _context.Professors select p;

            if (!string.IsNullOrEmpty(searchString))
            {
                professors = professors.Where(p => p.Name.Contains(searchString) || p.Surname.Contains(searchString));
            }

            professors = sortOrder switch
            {
                "Name" => professors.OrderBy(p => p.Name),
                "name_desc" => professors.OrderByDescending(p => p.Name),
                "Surname" => professors.OrderBy(p => p.Surname),
                "surname_desc" => professors.OrderByDescending(p => p.Surname),
                "HireDate" => professors.OrderBy(p => p.HireDate),
                "hiredate_desc" => professors.OrderByDescending(p => p.HireDate),
                "BirthDate" => professors.OrderBy(p => p.BirthDate),
                "birthdate_desc" => professors.OrderByDescending(p => p.BirthDate),
                _ => professors.OrderBy(p => p.Name),
            };

            return await PaginatedList<Professor>.CreateAsync(professors.Include(p => p.Department).AsNoTracking(), pageNumber, pageSize);
        }

        public async Task CreateProfessorAsync(Professor professor)
        {
            _context.Professors.Add(professor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProfessorAsync(Professor professor)
        {
            _context.Professors.Update(professor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProfessorAsync(int id)
        {
            var professor = await _context.Professors.FindAsync(id);
            if (professor != null)
            {
                _context.Professors.Remove(professor);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Assistant>> GetAssistantsByProfessorIdAsync(int professorId)
        {
            return await _context.Assistants.Where(a => a.ProfessorID == professorId).ToListAsync();
        }

        public async Task<IEnumerable<Grade>> GetGradesByProfessorIdAsync(int professorId)
        {
            return await _context.Grades.Where(g => g.ProfessorId == professorId).ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesByProfessorEmailAsync(string email)
        {
            var professor = await _context.Professors.FirstOrDefaultAsync(p => p.Email == email);
            return professor != null
                ? await _context.Courses.Where(c => c.ProfessorId == professor.ProfessorID).Include(c => c.Department).ToListAsync()
                : null;
        }

        public async Task<IEnumerable<Enrollment>> GetEnrollmentsByCourseIdAndProfessorIdAsync(int courseId, int professorId)
        {
            var course = await _context.Courses
                .Include(c => c.Enrollments)
                .FirstOrDefaultAsync(c => c.CourseId == courseId && c.ProfessorId == professorId);

            return course?.Enrollments ?? Enumerable.Empty<Enrollment>();
        }

        public async Task<bool> ProfessorExistsAsync(int id)
        {
            return await _context.Professors.AnyAsync(e => e.ProfessorID == id);
        }

        public async Task<IEnumerable<Department>> GetDepartmentsAsync()
        {
            return await _context.Departments.ToListAsync(); // Fetch departments from the context
        }

        public async Task<Professor> GetProfessorByEmailAsync(string email)
        {
            return await _context.Professors
                .FirstOrDefaultAsync(p => p.Email == email);
        }

        public async Task<IEnumerable<Course>> GetCoursesByProfessorIdAsync(int professorId)
        {
            return await _context.Courses
                .Where(c => c.ProfessorId == professorId)
                .Include(c => c.Department) // Include department if necessary
                .ToListAsync();
        }

        public async Task<Course> GetCourseByIdAndProfessorIdAsync(int courseId, int professorId)
        {
            return await _context.Courses
                .Include(c => c.Enrollments)    // Include Enrollments
                    .ThenInclude(e => e.Student) // Then include Students in the enrollments
                .FirstOrDefaultAsync(c => c.CourseId == courseId && c.ProfessorId == professorId);
        }


        public async Task<List<int>> GetGradedStudentIdsAsync(int courseId)
        {
            return await _context.Grades
                .Where(g => g.CourseId == courseId)
                .Select(g => g.StudentId)
                .ToListAsync();
        }

        public async Task SaveOrUpdateGradeAsync(int studentId, int courseId, int score, int professorId)
        {
            var existingGrade = await _context.Grades
                .FirstOrDefaultAsync(g => g.StudentId == studentId && g.CourseId == courseId);

            if (existingGrade != null)
            {
                existingGrade.Score = score;
                _context.Update(existingGrade);
            }
            else
            {
                var grade = new Grade
                {
                    StudentId = studentId,
                    CourseId = courseId,
                    Score = score,
                    ProfessorId = professorId,
                    DateGraded = DateTime.Now
                };

                _context.Grades.Add(grade);
            }

            await _context.SaveChangesAsync();
        }

        public async Task AddNotificationForStudentAsync(int studentId, string courseName, int score)
        {
            var notification = new Notification
            {
                StudentId = studentId,
                Message = $"You have been graded for the course {courseName}. Your new grade is {score}.",
                IsRead = false,
                DateCreated = DateTime.Now
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Grade>> GetGradedStudentsByProfessorIdAsync(int professorId)
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Course)
                .Where(g => g.ProfessorId == professorId)
                .ToListAsync();
        }

        public async Task<bool> RemoveGradeAsync(int gradeId)
        {
            var grade = await _context.Grades.FindAsync(gradeId);
            if (grade == null)
            {
                return false; // Grade not found
            }

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();
            return true; // Grade removed successfully
        }
    }
}
