using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities
{
    public class Contract
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public float Value { get; set; }
        public string JobType { get; set; }
        public int IdUser { get; set; }
        public virtual User User { get; set; }
        public ICollection<Location> Locations { get; set; }
    }
}
