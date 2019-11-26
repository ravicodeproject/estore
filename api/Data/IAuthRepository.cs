using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IAuthRepository
    {
         Task<Employee> Register (Employee employee,string password);         
         Task<Employee> Login(string username, string password);
         Task<bool> EmployeeExists(string username);
    }
}