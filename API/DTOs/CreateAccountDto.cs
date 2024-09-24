#nullable enable

namespace API.DTOs
{
    public class CreateAccountDto
    {
        public string? Nickname { get; set; }
        public DateTime? CreatedDate { get; set; }
        public float? InitialBalance { get; set; }
    }
}