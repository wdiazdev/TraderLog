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
    public class TradeAccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        public TradeAccountController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<Account>> CreateAccount(CreateAccountDto createAccountDto)
        {
            var account = new Account
            {
                Nickname = createAccountDto.Nickname,
                CreatedDate = createAccountDto.CreatedDate ?? DateTime.UtcNow,
                Balance = 0,
                Trades = new List<Trade>()
            };

            _context.Accounts.Add(account);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails{ Title = "Problem creating account" });

            return Ok(account);
           
        }

        [HttpGet]
        public async Task<ActionResult<List<Account>>> GetAllAccounts()
        {
            var accounts = await _context.Accounts.ToListAsync();

            if (accounts == null || accounts.Count == 0)
            {
                return NotFound(new ProblemDetails { Title = "No accounts found" });
            }

            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccountById(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null) return NotFound(new ProblemDetails { Title = "Account not found" });
        
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null) return NotFound(new ProblemDetails { Title = "Account not found" });

            _context.Accounts.Remove(account);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem deleting account" });

            return Ok(new { message = "Account deleted successfully" });
        }

        [HttpPut("nickname")]
        public async Task<ActionResult<Account>> UpdateNickname(UpdateNicknameDto updateDto)
        {
            var account = await _context.Accounts.FindAsync(updateDto.Id);

            if (account == null) return NotFound(new ProblemDetails { Title = "Account not found" });
  
            account.Nickname = updateDto.NewNickname;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating nickname" });

            return Ok(account);
        }
    }
}