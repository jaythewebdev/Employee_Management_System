using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagement.Interfaces;
using EmployeeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Services
{
    public class LeaveRepo : IBaseCRUD<int, Leave>
    {
        private Context _dbContext;

        public LeaveRepo(Context dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Leave?> Add(Leave item)
        {
            item.ApprovalStatus = false;
            //item.NoOfDays = item.EndDate.Date.Subtract(item.StartDate.Date).Days;
            _dbContext.Leaves.Add(item);
            await _dbContext.SaveChangesAsync();
            return item;
        }


        public async Task<Leave?> Update(Leave item)
        {
            var existingLeave = await _dbContext.Leaves.FindAsync(item.LeaveId);
            if (existingLeave != null)
            {
                existingLeave.EmpId = item.EmpId; // Update EmpId
                existingLeave.StartDate = item.StartDate;
                existingLeave.EndDate = item.EndDate;
                //existingLeave.NoOfDays = Convert.ToInt32(item.EndDate-item.StartDate)+1;
                existingLeave.Reason = item.Reason;
                existingLeave.ApprovalStatus = item.ApprovalStatus;
                existingLeave.ApprovedDate = item.ApprovedDate;

                //existingLeave.NoOfDays = ;

                await _dbContext.SaveChangesAsync();
            }
            return existingLeave;
        }



        public async Task<Leave?> Delete(int key)
        {
            var leave = await _dbContext.Leaves.FindAsync(key);
            if (leave != null)
            {
                _dbContext.Leaves.Remove(leave);
                await _dbContext.SaveChangesAsync();
            }
            return leave;
        }

        public async Task<Leave?> Get(int key)
        {
            return await _dbContext.Leaves.FindAsync(key);
        }

        public async Task<ICollection<Leave>?> GetAll()
        {
            return await _dbContext.Leaves.ToListAsync();
        }

    }
}