using EmployeeAPI.Models;
using EmployeeAPI.Models.DTO;
using EmployeeAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]/action")]
    [ApiController]
    [EnableCors("ReactCORS")]
    public class UserController : ControllerBase
    {
        private readonly UserServices _service;

        public UserController(UserServices service)
        {
            _service = service;
        }

        [HttpPost("Register_User")]
        [ProducesResponseType(typeof(UserDTO),StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[Authorize]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterDTO userDTO)
        {
            try
            {
                var user = await _service.Register(userDTO);
                if (user == null)
                {
                    return BadRequest("Unable to Register. Try again with a different mail.");
                }
                return Ok(user);
            }
            //catch (InvalidArgumentNullException iane)
            //{
            //    return BadRequest(new Error(2, iane.Message));
            //}
            //catch (InvalidNullReferenceException inre)
            //{
            //    return BadRequest(new Error(3, inre.Message));
            //}
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login_User")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> Login([FromBody] UserDTO userDTO)
        {
            var user = await _service.Login(userDTO);
            if (user == null)
            {
                return BadRequest("invalid username or password");
            }
            return Ok(user);
        }

        [HttpPut("Update_User_Status")]
        //[Authorize(Roles = "Manager")]
        [ProducesResponseType(typeof(ActionResult<Employee>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<StatusDTO>> UpdateUserStatus(StatusDTO userApproval)
        {
            var result = await _service.ChangeStatus(userApproval);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Unable to update the status");

        }

        [HttpPost("List_All_Employees")]
        //[Authorize(Roles = "Manager")]
        [ProducesResponseType(typeof(ActionResult<ICollection<Employee>>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Employee>>> GetAllEmployeesByManager(User user)
        {
            var result = await _service.ViewAllEmployeesByManager(user);
            if (result!=null)
            {
                return Ok(result);
            }
            return BadRequest("Unable to List the Employees");
        }

        [HttpPost("Update_Employees")]
        //[Authorize(Roles = "Employee")]
        [ProducesResponseType(typeof(ActionResult<Employee>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Employee>> UpdateEmployees(Employee employee)
        {
            var result = await _service.UpdateEmployeeDetails(employee);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Unable to update the Employee details");
        }

        [HttpPost("View_Profile")]
        [ProducesResponseType(typeof(ActionResult<Employee>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Employee>> ViewProfile(User user)
        {
            var result = await _service.ViewProfile(user);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Unable to View the Employee details");
        }
    }
}
