using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using notes.Entities;
using notes.Data;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace notes.Controllers
{
    [Authorize]
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        DataContext context;
        ILogger<NoteController> logger;
        public NoteController(DataContext context, ILogger<NoteController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NotesDto createData)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            logger.LogInformation($"add not for user {userId}");
            var elem = new Note()
            {
                Content = createData.Content,
                UserId = userId
            };
            context.Notes.Add(elem);
            await context.SaveChangesAsync();
            return Ok(new NotesDto
            {
                Id = elem.Id,
                Content = elem.Content,
                UserId = elem.UserId
            });

        }
        [HttpGet]
        public ActionResult<NotesDto[]> GetList([FromRoute] int id)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            logger.LogInformation($"get list for user {userId}");

            var items = context.Notes.Where(e => e.UserId == userId);
            return Ok(items);
        }

        [Route("{id}"), HttpGet]
        public ActionResult<NotesDto> Get([FromRoute] int id)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            Console.Write(userId);
            var res = context.Notes.SingleOrDefault(el => el.Id == id);
            if (res == null || res.UserId != userId)
            {
                return NotFound();
            }
            return Ok(res);
        }


        [Route("{id}"), HttpDelete]
        public async Task<IActionResult> Remove([FromRoute] int id)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var res = context.Notes.SingleOrDefault(el => el.Id == id);
            if (res == null || res.UserId != userId)
            {
                return NotFound();
            }
            context.Notes.Remove(res);
            await context.SaveChangesAsync();
            return Ok();
        }


        [Route("{id}"), HttpPatch]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] NotesDto d)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            logger.LogInformation($"update note {id} for user {userId}");
            var res = context.Notes.SingleOrDefault(el => el.Id == id);
            if (res == null || res.UserId != userId)
            {
                return NotFound();
            }
            if (d.Content != null)
            {
                res.Content = d.Content;
                await context.SaveChangesAsync();
            }
            return Ok();
        }
    }

    public class NotesDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int? UserId { get; set; }
    }
}
