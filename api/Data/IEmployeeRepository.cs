using System.Collections.Generic;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Data
{
    public interface IEmployeeRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<Employee>> GetEmployees(UserParams userParams);
         Task<Employee> GetEmployee(int id);
    }
}