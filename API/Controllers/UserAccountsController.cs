using API.Data;

namespace API.Controllers
{
    public class UserAccountsController
    {
        private readonly DataContext _context;
        public UserAccountsController(DataContext context)
        {
            _context = context;
        }
    }
}