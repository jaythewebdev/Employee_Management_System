using EmployeeManagement.Models;
using EmployeeManagement.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly LeaveServices _service;

        public LeaveController(LeaveServices leaveServices)
        {
            _service= leaveServices;
        }

        [HttpPost("CreateLeaveRequest")]
        public async Task<IActionResult> CreateLeaveRequest(Leave leave)
        {
            var result = await _service.CreateLeaveRequest(leave);

            if (result == null)
            {
                return BadRequest("Leave request overlaps with an existing request.");
            }

            return Ok(result);
        }


        [HttpGet("GetEmployeesByManagerId/{managerId}")]
        public async Task<IActionResult> GetEmployeesByManagerId(int managerId)
        {
            var result = await _service.GetEmployeesByManagerId(managerId);

            if (result == null)
            {
                return NotFound("No employees found for the given manager ID.");
            }

            return Ok(result);
        }

        [HttpPost("ApproveLeaveRequest/{leaveId}")]
        public async Task<IActionResult> ApproveLeaveRequest(int leaveId)
        {
            var result = await _service.ApproveLeaveRequest(leaveId);

            if (result == null)
            {
                return NotFound("Leave request not found.");
            }

            return Ok(result);
        }


        [HttpGet("GetLeaveRequestsByEmployeeId/{employeeId}")]
        public async Task<IActionResult> GetLeaveRequestsByEmployeeId(int employeeId)
        {
            var leaveRequests = await _service.GetLeaveRequestsByEmployeeId(employeeId);

            if (leaveRequests == null)
            {
                return NotFound("No leave requests found for the given employee ID.");
            }

            return Ok(leaveRequests);
        }

    }
}
