using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@example.com",
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@example.com",
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRoleAsync(admin, "Member");
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
    }
}