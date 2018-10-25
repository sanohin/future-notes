namespace notes.Entities
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? UserId { get; set; }

        public User User { get; set; }
    }
}