using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Models
{
    public class Context:DbContext
    {
        public Context(DbContextOptions Options) : base(Options)
        {

        }
        public DbSet<Leave>? Leaves { get; set; }
    }
}
