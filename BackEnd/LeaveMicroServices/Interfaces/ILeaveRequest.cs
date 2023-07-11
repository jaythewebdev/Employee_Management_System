using EmployeeManagement.Models;

namespace EmployeeManagement.Interfaces
{
    public interface ILeaveRequest
    {
        Task<Leave> CreateLeaveRequest(Leave leave);
        Task<Leave> ApproveLeaveRequest(int leaveId);
    }
}
