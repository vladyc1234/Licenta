using Microsoft.EntityFrameworkCore;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.LocationRepositories
{
    public class LocationRepository : GenericRepository<Location>, ILocationRepository
    {
        public LocationRepository(AppDbContext context) : base(context) { }


        public async Task<List<Location>> GetAllLocations()
        {
            return await _context.Locations.ToListAsync();
        }
        public async Task<Location> GetLocationById(int Id)
        {
            return await _context.Locations.Where(a => a.Id.Equals(Id)).FirstOrDefaultAsync();
        }
        public async Task<List<Location>> GetAllLocationsByCity(string City)
        {
            return await _context.Locations.Where(a => a.City.Equals(City)).ToListAsync();
        }
    }
}
