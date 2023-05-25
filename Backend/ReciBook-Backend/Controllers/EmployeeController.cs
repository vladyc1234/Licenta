using Microsoft.AspNetCore.Mvc;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.CreateDTO;
using ReciBook_Backend.Entities.DTOs;
using ReciBook_Backend.Repositories.EmployeeRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReciBook_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;
        public EmployeeController(IEmployeeRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var Employeess = await _repository.GetAllEmployees();

            var EmployeessToReturn = new List<EmployeeDTO>();

            foreach (var q in Employeess)
            {
                EmployeessToReturn.Add(new EmployeeDTO(q));
            }

            return Ok(EmployeessToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllEmployeessById(int id)
        {
            var employeess = await _repository.GetAllEmployees();

            var employeessToReturn = new List<EmployeeDTO>();

            foreach (var employee in employeess)
            {
                if(employee.IdTeam == id)
                    employeessToReturn.Add(new EmployeeDTO(employee));
            }

            return Ok(employeessToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employees = await _repository.GetByIdAsync(id);

            if (employees == null)
            {
                return NotFound("Employees does not exist!");
            }

            _repository.Delete(employees);

            await _repository.SaveAsync();

            return NoContent();
        }


        [HttpPost]
        public async Task<IActionResult> CreateEmployees(CreateEmployeeDTO dto)
        {
            Employee newEmployees = new Employee();

            newEmployees.Name = dto.Name;
            newEmployees.LastName = dto.LastName;
            newEmployees.IdTeam = dto.IdTeam;

            _repository.Create(newEmployees);

            await _repository.SaveAsync();


            return Ok(new EmployeeDTO(newEmployees));
        }
    }
}

