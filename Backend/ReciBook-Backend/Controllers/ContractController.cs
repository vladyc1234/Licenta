using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.CreateDTO;
using ReciBook_Backend.Entities.DTOs;
using ReciBook_Backend.Repositories.ContractRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly IContractRepository _repository;
        public ContractController(IContractRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllContracts()
        {
            var contracts = await _repository.GetAllContracts();

            var contractsToReturn = new List<ContractDTO>();

            foreach (var contract in contracts)
            {
                contractsToReturn.Add(new ContractDTO(contract));
            }

            return Ok(contractsToReturn);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetContractById(int id)
        {
            var contract = await _repository.GetContractById(id);

            ContractDTO contractToReturn = new ContractDTO(contract);

            return Ok(contractToReturn);
        }

        [HttpGet("contractsById/{id}")]
        public async Task<IActionResult> GetAllContractsById(int id)
        {
            var contracts = await _repository.GetAllContracts();

            var contractsToReturn = new List<ContractDTO>();

            foreach (var contract in contracts)
            {
                if (contract.IdUser == id)
                    contractsToReturn.Add(new ContractDTO(contract));
            }

            return Ok(contractsToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {
            var Contract = await _repository.GetByIdAsync(id);

            if (Contract == null)
            {
                return NotFound("Contract does not exist!");
            }

            _repository.Delete(Contract);

            await _repository.SaveAsync();

            return NoContent();
        }


        [HttpPost]
        public async Task<IActionResult> CreateContract(CreateContractDTO dto)
        {
            Contract newContract = new Contract();

            newContract.StartDate = dto.StartDate;
            newContract.FinishDate = dto.FinishDate;
            newContract.Value = dto.Value;
            newContract.IdUser = dto.IdUser;

            _repository.Create(newContract);

            await _repository.SaveAsync();


            return Ok(new ContractDTO(newContract));
        }

        [HttpPut("UpdateForForm")]
        public async Task<IActionResult> UpdateAsync([FromBody] Contract contract) 
        {
            var array_contract = await _repository.GetAllContracts();

            var contractIndex = array_contract.FindIndex((Contract _contract) => _contract.Id.Equals(contract.Id));

            array_contract[contractIndex] = contract;

            return Ok(array_contract);
        }
    }
}

