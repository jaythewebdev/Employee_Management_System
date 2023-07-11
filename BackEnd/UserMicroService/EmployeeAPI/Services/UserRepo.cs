﻿using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;
using EmployeeAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace EmployeeAPI.Services
{
    public class UserRepo : IBaseCRUD<int,User>
    {
        private readonly EmployeeContext _context;
        private readonly ILogger<UserRepo> _logger;

        public UserRepo(EmployeeContext context, ILogger<UserRepo> logger)
        {
            _context = context;
            _logger = logger;

        }
        public async Task<User?> Add(User item)
        {
            try
            {
                _context.Users.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<User?> Delete(int key)
        {
            try
            {
                var user = await Get(key);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return user;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<User?> Get(int key)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == key);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<User>?> GetAll()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                if (users.Count > 0)
                    return users;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<User?> Update(User item)
        {
            try
            {
                var user = await Get(item.UserId);
                if (user != null)
                {
                    //user.Role = item.Role;
                    user.Status = item.Status;
                    await _context.SaveChangesAsync();
                    return user;
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
