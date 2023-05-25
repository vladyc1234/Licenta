using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Entities.DTOs
{
    public class ContractDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public float Value { get; set; }
        public int IdUser { get; set; }

        public ContractDTO(Contract contract)
        {
            this.Id = contract.Id;
            this.StartDate = contract.StartDate;
            this.FinishDate = contract.FinishDate;
            this.Value = contract.Value;
            this.IdUser = contract.IdUser;
        }
    }
}
