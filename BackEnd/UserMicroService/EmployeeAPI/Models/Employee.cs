using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmployeeAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Id")]
        public User? User { get; set; }
        public int? ManagerId { get; set; }
        //[Required(ErrorMessage = "Name cannot be empty")]
        public string? Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Age { get; set; }
        //[Required(ErrorMessage = "Gender cannot be empty")]
        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set;}
        public string? Passport { get; set; }
        public string? DrivingLicenseNumber { get; set; }
    }
}
