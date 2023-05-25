using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ReciBook_Backend.Data;
using ReciBook_Backend.Entities;
using ReciBook_Backend.Entities.Constants;
using ReciBook_Backend.Repositories.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ReciBook_Backend.Repositories;
using ReciBook_Backend.Services;
using ReciBook_Backend.Repositories.TeamRepositories;
using ReciBook_Backend.Repositories.EmployeeRepositories;
using ReciBook_Backend.Repositories.LocationRepositories;
using ReciBook_Backend.Repositories.ContractRepositories;

namespace ReciBook_Backend
{
    public class Startup
    {
        public string SpecificOrigins = "_allowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy(name: SpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("localhost:4200", "http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
                                  });
            });

            //Repositories stuff
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IContractRepository, ContractRepository>();


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ManagerApp_Backend", Version = "v1" });
            });

            services.AddDbContext<AppDbContext>(options => options.UseSqlServer("Data Source=DESKTOP-LCU5F5H;Initial Catalog=Manager;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"));

            services.AddIdentity<User, Role>()
                  .AddEntityFrameworkStores<AppDbContext>()
                  .AddDefaultTokenProviders();

            _ = services.AddControllersWithViews()
               .AddNewtonsoftJson(options =>
               options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireRole(UserRoleType.Admin));
                options.AddPolicy("User", policy => policy.RequireRole(UserRoleType.User));
            });
            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
          .AddJwtBearer(options =>
          {
              options.SaveToken = true;
              options.TokenValidationParameters = new TokenValidationParameters
              {
                  ValidateIssuer = false,
                  ValidateAudience = false,
                  ValidateLifetime = true,
                  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom secret key for auth")),
                  ValidateIssuerSigningKey = true
              };
              options.Events = new JwtBearerEvents()
              {
                  OnTokenValidated = Helpers.SessionTokenValidator.ValidateSessionToken
              };
          });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ManagerApp_Backend v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(SpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
