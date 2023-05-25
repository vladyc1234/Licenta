using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.ContractRepositories
{
    public interface IContractRepository: IGenericRepository<Contract>
    {
        Task<List<Contract>> GetAllContracts();
        Task<Contract> GetContractsById(int IdUser);
        Task<Contract> GetContractById(int Id);
    }
   
}
