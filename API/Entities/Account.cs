using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Account
    {
        public string Nickname { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public int Balance { get; set; }
        // public List<Trade> Trades { get; set; } = [];
         // Foreign Key to IdentityUser
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
    }
}