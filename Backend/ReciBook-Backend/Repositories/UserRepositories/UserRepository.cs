using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.UserRepositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context) { }
        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByIdWithRoles(int Id)
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Id.Equals(Id));
        }

        public async Task<User> GetUserByEmail(string Email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(Email));
        }

        public async Task<User> GetUserById(int Id)
        {
            return await _context.Users.Where(a => a.Id.Equals(Id)).FirstOrDefaultAsync();
        }
    }
}

