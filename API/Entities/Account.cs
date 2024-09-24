namespace API.Entities
{
    public class Account
    {   
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Nickname { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public float InitialBalance { get; set; }
        public float Balance { get; set; }
        public List<Trade> Trades { get; set; } = [];
    }
}