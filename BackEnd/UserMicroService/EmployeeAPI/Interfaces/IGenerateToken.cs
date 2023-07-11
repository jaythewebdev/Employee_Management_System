using EmployeeAPI.Models.DTO;

namespace EmployeeAPI.Interfaces
{
    public interface IGenerateToken
    {
        public string GenerateToken(UserDTO user);

    }
}
