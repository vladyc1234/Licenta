using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.CreateDTO;
using ReciBook_Backend.Entities.DTOs;
using ReciBook_Backend.Repositories;
using ReciBook_Backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IRepositoryWrapper _repository;
        private readonly IUserService _service;

        public UserController(IRepositoryWrapper repository, IUserService service)
        {
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _repository.User.GetAllUsers();

            return Ok(new { users });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var User = await _repository.User.GetByIdAsync(id);

            return Ok(new { User } );
        }


    }
}
