using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;
using EmployeeAPI.Models.DTO;
using System.Security.Cryptography;
using System.Text;

namespace EmployeeAPI.Services
{
    public class UserServices
    {
        private readonly IBaseCRUD<int, User> _userRepo;
        private readonly IBaseCRUD<int, Employee> _employeeRepo;
        private readonly IGenerateToken _generateToken;

        public UserServices(IBaseCRUD<int,User> userRepo, IBaseCRUD<int,Employee> employeeRepo,IGenerateToken generateToken)
        {

            _userRepo = userRepo;
            _employeeRepo = employeeRepo;
            _generateToken=generateToken;
        }


        public async Task<UserDTO> Register(RegisterDTO employee)
        {

            UserDTO user = null;
            var hmac = new HMACSHA512();            
            employee.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(employee.PasswordClear));
            employee.User.PasswordKey = hmac.Key;
            employee.User.Role = "Employee";
            employee.User.Status = "InActive";
            var users =await  _employeeRepo.GetAll();
            if (users != null)
            {
                var myUser = users.FirstOrDefault(u => u.Email == employee.Email && u.Phone == employee.Phone 
                && u.Passport==employee.Passport && u.DrivingLicenseNumber==employee.DrivingLicenseNumber);
                if (myUser != null)
                {
                    return null;
                }
            }
            var userResult = await _userRepo.Add(employee.User);
            var employeeResult = await _employeeRepo.Add(employee);
            if (userResult != null && employeeResult != null)
            {
                user = new UserDTO();
                user.UserId = employeeResult.Id;
                user.Role = userResult.Role;
                user.Token = _generateToken.GenerateToken(user);
            }
            return user;
        }

        public async Task<UserDTO> Login(UserDTO user)
        {
            var userData = await _userRepo.Get(user.UserId);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordHash[i])
                        return null;
                }
                user = new UserDTO();
                user.UserId = userData.UserId;
                user.Role = userData.Role;
                user.Token = _generateToken.GenerateToken(user);
            }
            return user;
        }
        public async Task<StatusDTO> ChangeStatus(StatusDTO userApproval)
        {
            var userData = await _userRepo.Get(userApproval.Id);
            if (userData != null)
            {
                userData.Status = userApproval.Status;
                var result = await _userRepo.Update(userData);
                if (result != null)
                {
                    return userApproval;
                }
            }
            return null;
        }
        public async Task<ICollection<Employee>?> ViewAllEmployeesByManager(User user)
        {
            var users=await _employeeRepo.GetAll();
            List<Employee> userData;
            if (users!= null)
            {
                userData = users.Where(u => u.ManagerId == user.UserId).ToList();
                if (userData != null && userData.Count>0)
                {
                    return userData;
                }
            }
            return null;
        }

        public async Task<Employee?> UpdateEmployeeDetails(Employee employee)
        {
            var users = await _employeeRepo.Update(employee);
            if (users != null)
            {
                return users;
            }
            return null; 
        }

        public async Task<Employee?> ViewProfile(User user)
        {
            var users = await _employeeRepo.Get(user.UserId);
            if (users != null)
            {
                return users;
            }
            return null;
        }
    }
}
