using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>()
                .HasData(
                    new Role{Id = 1, Name = "Member",NormalizedName = "MEMBER"},
                    new Role{Id = 2, Name = "Admin",NormalizedName = "ADMIN"}
            );
        }
    }
}