using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.TeamRepositories
{
    public interface ITeamRepository : IGenericRepository<Team>
    {
        Task<List<Team>> GetAllTeams();
        Task<Team> GetTeamById(int Id);
        Task<List<Team>> GetAllTeamsById(int IdUser);
        Task<List<Team>> GetAllTeamsByFunction(string JobType);


    }
}
