using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await _context.Employees.Include(p =>p.Photos).FirstOrDefaultAsync(e => e.Eid == id);
        }

        // public async Task<IEnumerable<Employee>> GetEmployees()
        // {
        //     return await _context.Employees.Include(p =>p.Photos).ToListAsync();
        // }

        public async Task<PagedList<Employee>> GetEmployees(UserParams userParams)
        {
            var employees =  _context.Employees.Include(p =>p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            employees = employees.Where(u => u.Eid != userParams.Eid);

            if (!string.IsNullOrEmpty(userParams.Egender))
            {
                employees = employees.Where(u => u.Egender == userParams.Egender);
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                employees = employees.Where(u => u.Edateofbirth >= minDob && u.Edateofbirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        employees = employees.OrderByDescending(u => u.Created);
                        break;
                    default:
                        employees = employees.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<Employee>.CreateAsync(employees, 
            userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}