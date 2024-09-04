namespace API.DTOs
{
    public class CreateAccountDto
    {
        public string Nickname { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Balance { get; set; }
    }
}