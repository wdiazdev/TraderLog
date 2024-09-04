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

        public DbSet<Account> Accounts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<Account>()
            //     .HasOne(a => a.User)
            //     .WithMany()
            //     .HasForeignKey(a => a.UserId)
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role{Id = 1, Name = "Member",NormalizedName = "MEMBER"},
                    new Role{Id = 2, Name = "Admin",NormalizedName = "ADMIN"}
            );
        }
    }
}