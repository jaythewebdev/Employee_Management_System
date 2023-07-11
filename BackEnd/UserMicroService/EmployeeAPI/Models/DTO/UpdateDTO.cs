namespace EmployeeAPI.Models.DTO
{
    public class UpdateDTO
    {
        public int Id { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Passport { get; set; }
        public string? DrivingLicenseNumber { get; set; }

    }
}
