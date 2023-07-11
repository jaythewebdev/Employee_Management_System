using EmployeeManagement.Models;

namespace EmployeeManagement.Interfaces
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Leave>> GetEmployeesByManagerId(int managerId);

    }
}
