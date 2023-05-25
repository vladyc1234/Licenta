using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.SessionTokenRepositories
{
    public interface ISessionTokenRepository : IGenericRepository<SessionToken>
    {
        Task<SessionToken> GetByJTI(string jti);
    }
    
}
