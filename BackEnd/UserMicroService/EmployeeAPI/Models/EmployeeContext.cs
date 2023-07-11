using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace EmployeeAPI.Models
{
    public class EmployeeContext: DbContext
    {
        //The base is used to call the constructor of the base class with parameter as(Options) 
        public EmployeeContext(DbContextOptions Options):base(Options)
        {

        }
        public DbSet<User>? Users { get; set; }
        public DbSet<Employee>? Employees { get; set; }

        //Overriding OnModelCreating (Configurations)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().Property(i => i.Id).ValueGeneratedNever();
            //modelBuilder.Entity<Employee>().HasIndex(e => new { e.DrivingLicenseNumber, e.Passport }).IsUnique(true);
        }
    }
}
