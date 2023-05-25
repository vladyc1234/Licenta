using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.UserRepositories
{
    public interface IUserRepository: IGenericRepository<User>
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetUserByEmail(string Email);
        Task<User> GetByIdWithRoles(int Id);

        Task<User> GetUserById(int Id);
    }
    
}

