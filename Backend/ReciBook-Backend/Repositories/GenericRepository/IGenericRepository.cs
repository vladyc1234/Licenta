using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ReciBook_Backend.Repositories.GenericRepository
{
    public interface IGenericRepository<TEntity>
    {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> GetByNameAsync(string name);

        // Create
        void Create(TEntity entity);
        void CreateRange(IEnumerable<TEntity> entities);


        // Update
        void Update(TEntity entity);

        // Delete
        void Delete(TEntity entity);
        void DeleteRange(IEnumerable<TEntity> entities);

        // Save
        Task<bool> SaveAsync();

    }
}
