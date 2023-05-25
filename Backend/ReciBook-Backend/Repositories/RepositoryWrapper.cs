using ReciBook_Backend.Data;
using ReciBook_Backend.Repositories.ContractRepositories;
using ReciBook_Backend.Repositories.EmployeeRepositories;
using ReciBook_Backend.Repositories.TeamRepositories;
using ReciBook_Backend.Repositories.SessionTokenRepositories;
using ReciBook_Backend.Repositories.UserRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReciBook_Backend.Repositories.LocationRepositories;

namespace ReciBook_Backend.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly AppDbContext _context;
        
        private IUserRepository _user;
        private IContractRepository _contract;
        private ITeamRepository _team;
        private ISessionTokenRepository _sessionToken;
        private IEmployeeRepository _employee;
        private ILocationRepository _location;


        public RepositoryWrapper(AppDbContext context)
        {
            _context = context;
        }


        public IEmployeeRepository Employee 
        {
            get
            {
                if (_employee == null) _employee = new EmployeeRepository(_context);
                return _employee;
            }
        }

        public ILocationRepository Location
        {
            get
            {
                if (_location == null) _location = new LocationRepository(_context);
                return _location;
            }
        }

        public IUserRepository User
        {
            get
            {
                if (_user == null) _user = new UserRepository(_context);
                return _user;
            }
        }
        public IContractRepository Contract

        {
            get
            {
                if (_contract == null) _contract = new ContractRepository(_context);
                return _contract;
            }
        }
        public ITeamRepository Team
        {
            get
            {
                if (_team == null) _team = new TeamRepository(_context);
                return _team;
            }
        }
        public ISessionTokenRepository SessionToken
        {
            get
            {
                if (_sessionToken == null) _sessionToken = new SessionTokenRepository(_context);
                return _sessionToken;
            }
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
