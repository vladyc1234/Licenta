using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.CreateDTO
{
    public class CreateLocationDTO
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int IdContract { get; set; }
    }
}
