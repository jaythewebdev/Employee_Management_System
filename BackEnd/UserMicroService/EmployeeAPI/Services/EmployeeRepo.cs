using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;
using EmployeeAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Services
{
    public class EmployeeRepo : IBaseCRUD<int, Employee>
    {
        private readonly EmployeeContext _context;
        private readonly ILogger<User> _logger;

        public EmployeeRepo(EmployeeContext context, ILogger<User> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Employee?> Add(Employee item)
        {
            try
            {
                _context.Employees.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Employee?> Delete(int key)
        {
            try
            {
                var employee = await Get(key);
                if (employee != null)
                {
                    _context.Employees.Remove(employee);
                    await _context.SaveChangesAsync();
                    return employee;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Employee?> Get(int key)
        {
            try
            {
                var employee = await _context.Employees.Include(i => i.User).FirstOrDefaultAsync(i => i.Id == key);
                return employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Employee>?> GetAll()
        {
            try
            {
                var employee = await _context.Employees.Include(i => i.User).ToListAsync();
                if (employee.Count > 0)
                    return employee;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Employee?> Update(Employee item)
        {
            try
            {
                var employee = _context.Employees.FirstOrDefault(u => u.Id == item.Id); ;
                if (employee != null)
                {
                    //employee.Phone = item.Phone;
                    //employee.Address = item.Address;
                    //employee.Passport = item.Passport;
                    //employee.DrivingLicenseNumber = item.DrivingLicenseNumber;
                    //await _context.SaveChangesAsync();
                    //return employee;
                    employee.Phone = item.Phone!=null ? item.Phone : employee.Phone;
                    employee.Address = item.Address!=null ? item.Address : employee.Address;
                    employee.Passport = item.Passport != null ? item.Passport : employee.Passport;
                    employee.DrivingLicenseNumber = item.DrivingLicenseNumber != null ? item.DrivingLicenseNumber : employee.DrivingLicenseNumber;
                    await _context.SaveChangesAsync();
                    return employee;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
