using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.CreateDTO;
using ReciBook_Backend.Entities.DTOs;
using ReciBook_Backend.Repositories.TeamRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _repository;
        public TeamController(ITeamRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _repository.GetAllTeams();

            var teamsToReturn = new List<TeamDTO>();

            foreach (var team in teams)
            {
                teamsToReturn.Add(new TeamDTO(team));
            }

            return Ok(teamsToReturn);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTeamById(int id)
        {
            var team = await _repository.GetTeamById(id);

            TeamDTO teamToReturn = new TeamDTO(team);

            return Ok(teamToReturn);
        }

        [HttpGet("teamsById/{id}")]
        public async Task<IActionResult> GetAllTeamsById(int id)
        {
            var teams = await _repository.GetAllTeams();

            var teamsToReturn = new List<TeamDTO>();

            foreach (var team in teams)
            {
                if (team.IdUser == id)
                    teamsToReturn.Add(new TeamDTO(team));
            }

            return Ok(teamsToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _repository.GetByIdAsync(id);

            if (team == null)
            {
                return NotFound("Team does not exist!");
            }

            _repository.Delete(team);

            await _repository.SaveAsync();

            return NoContent();
        }


        [HttpPost]
        public async Task<IActionResult> CreateTeam(CreateTeamDTO dto)
        {
            Team newTeam = new Team();

            newTeam.JobType = dto.JobType;
            newTeam.Availability = dto.Availability;
            newTeam.IdUser = dto.IdUser;

            _repository.Create(newTeam);

            await _repository.SaveAsync();


            return Ok(new TeamDTO(newTeam));
        }

        [HttpPut("UpdateForForm")]
        public async Task<IActionResult> UpdateAsync([FromBody] Team team)
        {
            var array_team = await _repository.GetAllTeams();

            var teamIndex = array_team.FindIndex((Team _team) => _team.Id.Equals(team.Id));

            array_team[teamIndex] = team;

            return Ok(array_team);
        }
    }
}

