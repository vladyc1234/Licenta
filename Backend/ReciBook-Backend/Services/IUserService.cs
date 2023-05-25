using ReciBook_Backend.Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Services
{
     public interface IUserService
    {
        Task<bool> RegisterUserAsync(RegisterUserDTO dto);
        Task<string> LoginUser(LoginUserDTO dto);

    }
}
