using Microsoft.EntityFrameworkCore;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.EmployeeRepositories
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(AppDbContext context) : base(context) { }
        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _context.Employees.ToListAsync();
        }
        public async Task<Employee> GetEmployeesById(int IdTeam)
        {
            return await _context.Employees.Where(a => a.IdTeam.Equals(IdTeam)).FirstOrDefaultAsync();
        }
    }
}
