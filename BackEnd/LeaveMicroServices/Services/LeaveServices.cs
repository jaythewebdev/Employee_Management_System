using EmployeeManagement.Interfaces;
using EmployeeManagement.Models;
using EmployeeManagement.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Services
{
    public class LeaveServices
    {
        private readonly IBaseCRUD<int, Leave> _services;

        public LeaveServices(IBaseCRUD<int, Leave> services)
        {
            _services = services;
        }

        public async Task<ApplyLeaveDTO?> CreateLeaveRequest(Leave leave)
        {
            // Check for overlapping leave requests
            var users = await _services.GetAll();
            var overlappingUser = users.FirstOrDefault(u => u.EmpId == leave.EmpId &&
                ((leave.StartDate <= u.EndDate && leave.EndDate >= u.StartDate) ||
                (leave.StartDate <= u.StartDate && leave.EndDate >= u.EndDate)));

            if (overlappingUser != null)
            {
                throw new InvalidOperationException("Leave request overlaps with an existing leave request.");
            }

            // Calculate the number of days
            var numberOfDays = (leave.EndDate.Date - leave.StartDate.Date).Days + 1;
            leave.NoOfDays = numberOfDays;

            // Add the leave to the database
            var addedLeave = await _services.Add(leave);

            if (addedLeave == null)
            {
                throw new Exception("Leave request could not be created."); // Add appropriate error handling
            }

            ApplyLeaveDTO applyLeaveDTO = new ApplyLeaveDTO
            {
                LeaveId = addedLeave.LeaveId,
                EmpId = addedLeave.EmpId,
                StartDate = addedLeave.StartDate,
                EndDate = addedLeave.EndDate,
                NoOfDays = addedLeave.NoOfDays,
                Reasons = addedLeave.Reason
            };

            return applyLeaveDTO;
        }



        public async Task<ICollection<Leave>?> GetEmployeesByManagerId(int managerId)
        {
            var users = await _services.GetAll();
            var user = users.Where(u => u.ManagerId == managerId && u.ApprovalStatus == false).ToList();
            if (user.Count > 0)
            {
                return user;
            }
            return null;
        }

        public async Task<Leave?> ApproveLeaveRequest(int leaveId)
        {
            var user = await _services.Get(leaveId);
            if (user == null)
                return null;
            user.ApprovalStatus = true;
            user.ApprovedDate = DateTime.Now;
            await _services.Update(user);

            return user;
        }

        public async Task<ICollection<Leave>?> GetLeaveRequestsByEmployeeId(int employeeId)
        {
            var leaveRequests = await _services.GetAll();
            return leaveRequests.Where(l => l.EmpId == employeeId).ToList();
        }


    }
}