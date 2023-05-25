using Microsoft.EntityFrameworkCore;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.ContractRepositories
{
    public class ContractRepository: GenericRepository<Contract>, IContractRepository
    {
        public ContractRepository(AppDbContext context) : base(context) { }
        public async Task<List<Contract>> GetAllContracts()
        {
            return await _context.Contracts.ToListAsync();
        }
        public async Task<Contract> GetContractById(int Id)
        {
            return await _context.Contracts.Where(a => a.Id.Equals(Id)).FirstOrDefaultAsync();
        }
        public async Task<Contract> GetContractsById(int IdUser)
        {
            return await _context.Contracts.Where(a => a.IdUser.Equals(IdUser)).FirstOrDefaultAsync();
        }
    }
}
