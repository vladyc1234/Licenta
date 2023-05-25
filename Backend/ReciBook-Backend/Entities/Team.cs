using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string JobType { get; set; }
        public int Availability { get; set; }
        public int IdUser { get; set; }
        public virtual User User { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}
