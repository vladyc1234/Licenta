using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.CreateDTO
{
    public class CreateTeamDTO
    {
        public int Id { get; set; }
        public string JobType { get; set; }
        public int Availability { get; set; }
        public int IdUser { get; set; }
    }
}
