using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Employee> Login(string username, string password)
        {
           //var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Username == username);
           var employee = await _context.Employees.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Username == username);

            if (employee == null)
                return null;

            if (!VerifyPasswordHash(password, employee.PasswordHash, employee.PasswordSalt))
                return null;

            return employee;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<Employee> Register(Employee employee, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            employee.PasswordHash = passwordHash;
            employee.PasswordSalt = passwordSalt;

            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> EmployeeExists(string username)
        {
            bool isEmployeeExist = await _context.Employees.AnyAsync(x => x.Username == username);           

             return isEmployeeExist;
        }
    }
}