using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.CreateDTO;
using ReciBook_Backend.Entities.DTOs;
using ReciBook_Backend.Repositories.LocationRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _repository;
        public LocationController(ILocationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLocations()
        {
            var locations = await _repository.GetAllLocations();

            var locationToReturn = new List<LocationDTO>();

            foreach (var location in locations)
            {
                locationToReturn.Add(new LocationDTO(location));
            }

            return Ok(locationToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllLocationsById(int id)
        {
            var locations = await _repository.GetAllLocations();

            var locationToReturn = new List<LocationDTO>();

            foreach (var location in locations)
            {
                if (location.IdContract == id)
                    locationToReturn.Add(new LocationDTO(location));
            }

            return Ok(locationToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _repository.GetByIdAsync(id);

            if (location == null)
            {
                return NotFound("Location does not exist!");
            }

            _repository.Delete(location);

            await _repository.SaveAsync();

            return NoContent();
        }


        [HttpPost]
        public async Task<IActionResult> CreateLocation(CreateLocationDTO dto)
        {
            Location newLocation = new Location();

            newLocation.City = dto.City;
            newLocation.Address = dto.Address;
            newLocation.IdContract = dto.IdContract;

            _repository.Create(newLocation);

            await _repository.SaveAsync();

            return Ok(new LocationDTO(newLocation));
        }

        [HttpPut("UpdateForForm")]
        public async Task<IActionResult> UpdateAsync([FromBody] Location location)
        {
            var array_location = await _repository.GetAllLocations();

            var locationIndex = array_location.FindIndex((Location _location) => _location.Id.Equals(location.Id));

            array_location[locationIndex] = location;

            return Ok(array_location);
        }
    }
}
