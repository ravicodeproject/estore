using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : DbContext
    {
        //this constructor must be public
        public DataContext(DbContextOptions<DataContext> options):base(options){} 
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}