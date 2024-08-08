using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server
{
    public class Bd
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Pass {  get; set; }

        public DateTimeOffset Date { get; set; } = DateTimeOffset.Now;
    }
}
