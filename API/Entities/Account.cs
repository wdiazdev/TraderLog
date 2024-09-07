namespace API.Entities
{
    public class Account
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public string Nickname { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public int InitialBalance { get; set; }
        public int Balance { get; set; }
        public List<Trade> Trades { get; set; } = [];
    }
}