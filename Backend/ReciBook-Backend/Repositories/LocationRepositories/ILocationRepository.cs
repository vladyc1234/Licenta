using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.LocationRepositories
{
    public interface ILocationRepository : IGenericRepository<Location>
    {
            Task<List<Location>> GetAllLocations();
            Task<Location> GetLocationById(int id);
            Task<List<Location>> GetAllLocationsByCity(string City);
    }
}
