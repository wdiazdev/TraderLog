using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UserAccountsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        public UserAccountsController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<CreateAccountDto>> CreateAccount(Account account)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null) return Unauthorized();

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return new CreateAccountDto
            {
                Nickname = account.Nickname,
                CreatedDate = account.CreatedDate,
                Balance = account.Balance,
            };
        }
    }
}