namespace EmployeeAPI.Models.DTO
{
    public class UserDTO
    {
        // DTO DataTransfer Object Used to Transfer Data from Various Part of the Application
        public int UserId { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; }
    }
}
