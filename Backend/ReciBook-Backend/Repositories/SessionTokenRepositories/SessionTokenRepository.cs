using Microsoft.EntityFrameworkCore;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.SessionTokenRepositories
{
    public class SessionTokenRepository : GenericRepository<SessionToken>, ISessionTokenRepository
    {
        public SessionTokenRepository(AppDbContext context) : base(context) { }


        public async Task<SessionToken> GetByJTI(string jti)
        {
            return await _context.SessionTokens.FirstOrDefaultAsync(t => t.Jti.Equals(jti));
        }

    }
}
