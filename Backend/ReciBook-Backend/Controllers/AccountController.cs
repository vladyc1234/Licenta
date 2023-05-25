using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.DTOs;
using ReciBook_Backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;

        public AccountController(
            UserManager<User> userManager,
            IUserService userService
            )
        {
            _userManager = userManager;
            _userService = userService;
        }
        [HttpGet("{email}")]
        public async Task<IActionResult> GetAcountByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return Ok(user);

        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO dto)
        {
            var exists = await _userManager.FindByEmailAsync(dto.Email);

            if (exists != null)
            {
                return BadRequest("User already registered!");
            }

            var result = await _userService.RegisterUserAsync(dto);

            if (result)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO dto)
        {
            var token = await _userService.LoginUser(dto);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { token });
        }
    }
}
