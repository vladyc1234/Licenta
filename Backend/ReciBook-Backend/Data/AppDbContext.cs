using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReciBook_Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReciBook_Backend.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, int,
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<SessionToken> SessionTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
               .HasMany(a => a.Contracts)
               .WithOne(b => b.User);

            modelBuilder.Entity<User>()
               .HasMany(a => a.Teams)
               .WithOne(b => b.User);

            modelBuilder.Entity<Team>()
               .HasMany(a => a.Employees)
               .WithOne(b => b.Team);

            modelBuilder.Entity<Contract>()
               .HasMany(a => a.Locations)
               .WithOne(b => b.Contract);

            // MadeWith
            //modelBuilder.Entity<MadeWith>().HasKey(x => new { x.Name, x.IdRecipe });

           // modelBuilder.Entity<MadeWith>()
           //     .HasOne(rf => rf.Recipe)
           //     .WithMany(r => r.MadeWiths)
           //     .HasForeignKey(rf => rf.IdRecipe);

           // modelBuilder.Entity<MadeWith>()
           //     .HasOne(rf => rf.Ingredient)
           //     .WithMany(f => f.MadeWiths)
           //     .HasForeignKey(rf => rf.Name);


            base.OnModelCreating(modelBuilder);
        }
    }
}
