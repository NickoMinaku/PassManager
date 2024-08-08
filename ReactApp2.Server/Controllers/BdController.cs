using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BdController : ControllerBase
    {
        private readonly ILogger<BdController> _logger;
        ApplicationContext db;

        public BdController(ILogger<BdController> logger, ApplicationContext db)
        {
            _logger = logger;
            this.db = db;
        }

        [HttpGet(Name = "GetBd")]
        public IEnumerable Get()
        {
            return db.Bd.OrderByDescending(b => b.Date).ToArray();
        }

        [HttpPost(Name = "PostBd")]
        public async Task<IEnumerable<Bd>> Post([FromForm] Bd db) {
            this.db.Bd.Add(db);
            await this.db.SaveChangesAsync();
            return this.db.Bd.OrderByDescending(b => b.Date).ToArray();
        }
    }
}
