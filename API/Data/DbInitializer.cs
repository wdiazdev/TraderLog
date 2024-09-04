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

            // if (!context.Accounts.Any())
            // {
            //     var accounts = new List<Account>
            //     {
            //         new()
            //         {
            //             Nickname = "PrimaryAccount",
            //             Balance = 10000,
            //             Trades = new List<Trade>
            //             {
            //                 new() { TradeDate = DateTime.UtcNow, Amount = -500 },
            //                 new() { TradeDate = DateTime.UtcNow.AddDays(-1), Amount = 1500 }
            //             }
            //         },
            //         new()
            //         {
            //             Nickname = "SecondaryAccount",
            //             Balance = 5000,
            //             Trades = new List<Trade>
            //             {
            //                 new() { TradeDate = DateTime.UtcNow, Amount = -1000 },
            //                 new() { TradeDate = DateTime.UtcNow.AddDays(-2), Amount = 2000 }
            //             }
            //         }
            //     };

            //     await context.Accounts.AddRangeAsync(accounts);
            //     await context.SaveChangesAsync();
            // }
        }
    }
}