using Microsoft.EntityFrameworkCore;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.TeamRepositories
{
    public class TeamRepository : GenericRepository<Team>, ITeamRepository
    {
        public TeamRepository(AppDbContext context) : base(context) { }

        public async Task<List<Team>> GetAllTeams()
        {
            return await _context.Teams.ToListAsync();
        }

        public async Task<Team> GetTeamById(int Id)
        {
            return await _context.Teams.Where(a => a.Id == Id).FirstOrDefaultAsync(); 
        }

        public async Task<List<Team>> GetAllTeamsById(int IdUser)
        {
            return await _context.Teams.Where(a => a.IdUser == IdUser).ToListAsync(); 
        }

        public async Task<List<Team>> GetAllTeamsByFunction(string JobType)
        {
            return await _context.Teams.Where(a => a.JobType == JobType).ToListAsync(); 
        }
    }
}
