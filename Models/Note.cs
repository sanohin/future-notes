namespace notes.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
    }
}