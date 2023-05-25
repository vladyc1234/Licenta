using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.CreateDTO
{
    public class CreateEmployeeDTO
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public int IdTeam { get; set; }
    }
}
