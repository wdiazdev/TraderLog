using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("TradeItems")]
    public class Trade
    {
        public int Id { get; set; }
        public DateTime TradeDate { get; set; }
        public int Amount { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }
    }
}