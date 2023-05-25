using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.DTOs
{
    public class TeamDTO
    {

        public int Id { get; set; }
        public string JobType { get; set; }
        public int Availability { get; set; }
        public int IdUser { get; set; }

        public TeamDTO(Team team)
        {
            this.Id = team.Id;
            this.JobType = team.JobType;
            this.Availability = team.Availability;
            this.IdUser = team.IdUser;
        }
    }
}
