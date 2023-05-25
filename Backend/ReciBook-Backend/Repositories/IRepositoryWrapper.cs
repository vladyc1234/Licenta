using ReciBook_Backend.Repositories.ContractRepositories;
using ReciBook_Backend.Repositories.EmployeeRepositories;
using ReciBook_Backend.Repositories.TeamRepositories;
using ReciBook_Backend.Repositories.SessionTokenRepositories;
using ReciBook_Backend.Repositories.UserRepositories;
using System.Threading.Tasks;
using ReciBook_Backend.Repositories.LocationRepositories;

namespace ReciBook_Backend.Repositories
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
        ILocationRepository Location { get; }
        IEmployeeRepository Employee { get; }
        IContractRepository Contract { get; }
        ITeamRepository Team { get; }
        ISessionTokenRepository SessionToken { get; }

        Task SaveAsync();
    }
}
