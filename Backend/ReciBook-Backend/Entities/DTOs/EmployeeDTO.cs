using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public int IdTeam { get; set; }

        public EmployeeDTO(Employee employee)
        {
            this.Id = employee.Id;
            this.LastName = employee.LastName;
            this.Name = employee.Name;
            this.IdTeam = employee.IdTeam;
        }



    }
}
