using Microsoft.AspNetCore.Identity;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.SeedDb
{
    public class SeedDb
    {
        private readonly RoleManager<Role> _roleManager;
        private readonly AppDbContext _context;

        public SeedDb(RoleManager<Role> roleManager, AppDbContext context)
        {
            _roleManager = roleManager;
            _context = context;
        }

        public async Task SeedRoles()
        {
            if (_context.Roles.Any())
            {
                return;
            }

            string[] roleNames =
            {
                UserRoleType.Admin,
                UserRoleType.User
            };

            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExists = await _roleManager.RoleExistsAsync(roleName);

                if (!roleExists)
                {
                    roleResult = await _roleManager.CreateAsync(new Role
                    {
                        Name = roleName
                    });
                }

                await _context.SaveChangesAsync();
            }
        }
    }
}
