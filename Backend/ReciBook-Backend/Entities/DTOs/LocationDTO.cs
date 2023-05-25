using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.DTOs
{
    public class LocationDTO
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int IdContract { get; set; }

        public LocationDTO(Location location)
        {
            this.Id = location.Id;
            this.City = location.City;
            this.Address = location.Address;
            this.IdContract = location.IdContract;
        }
    }
}
