using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Bd> Bd { get; set; }
        IConfiguration conf;
        public ApplicationContext(IConfiguration AppConfiguration)
        {
            conf = AppConfiguration;
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (conf["ASPNETCORE_ENVIRONMENT"] == "Development")
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=postgres");
            else
                optionsBuilder.UseNpgsql("Host=200.0.0.4;Port=5432;Database=postgres;Username=postgres;Password=postgres");
        }
    }
}
