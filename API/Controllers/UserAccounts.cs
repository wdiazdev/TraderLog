using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("createAccount")]
        public async Task<ActionResult<Account>> CreateAccount(CreateAccountDto createAccountDto)
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();
            
            var account = new Account
            {   
                UserId = int.Parse(userId),
                Nickname = createAccountDto.Nickname,
                CreatedDate = createAccountDto.CreatedDate ?? DateTime.UtcNow,
                InitialBalance = createAccountDto.InitialBalance > 0 ? createAccountDto.InitialBalance : 0,
                Balance = 0,
                Trades = new List<Trade>()
            };

            _context.Accounts.Add(account);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails{ Title = "Problem creating account" });

            account.Name = $"{account.CreatedDate:yyyyMMdd}-{account.Id}";

            await _context.SaveChangesAsync();

            return Ok(account);
        }

        [HttpGet]
        public async Task<ActionResult<List<Account>>> GetAllAccounts()
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var accounts = await _context.Accounts
                .Where(u => u.UserId == int.Parse(userId))
                .ToListAsync();

            if (accounts == null || accounts.Count == 0)
            {
                return NotFound(new ProblemDetails { Title = "No accounts found" });
            }

            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccountById(int id)
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == int.Parse(userId));

            if (account == null) return NotFound(new ProblemDetails { Title = "Account not found" });
        
            return Ok(account);
        }

        [HttpDelete("deleteAccount/{id}")]
        public async Task<ActionResult> DeleteAccount(int id)
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == int.Parse(userId));

            if (account == null) return NotFound(new ProblemDetails { Title = "Account not found" });

            _context.Accounts.Remove(account);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem deleting account" });

            return Ok(new { message = "Account deleted successfully" });
        }

        [HttpPut("updateAccount")]
        public async Task<ActionResult<Account>> UpdateNickname(UpdateNicknameDto updateDto)
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.Id == updateDto.Id && a.UserId == int.Parse(userId));

            if (account == null) return NotFound(new ProblemDetails { Title = "Account not found" });
  
            account.Nickname = updateDto.NewNickname;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating nickname" });

            return Ok(account);
        }

        private string GetUserId()
        {
            return _userManager.GetUserId(User);
        }
    }
}