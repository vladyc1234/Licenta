using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.EmployeeRepositories
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeesById(int IdTeam);
    }
}
