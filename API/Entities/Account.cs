namespace API.Entities
{
    public class Account
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public int Balance { get; set; }
        public List<Trade> Trades { get; set; } = [];
    }
}