
using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using notes.Entities;
using notes.Data;

namespace notes.Controllers
{
    [Authorize]
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        DataContext context;
        private readonly UserManager<User> _userManager;
        public NoteController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public IActionResult Add([FromBody] NotesDto createData)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            Console.Write(userId);
            var elem = new Note()
            {
                Content = createData.Content,
                UserId = userId
            };
            context.Notes.Add(elem);
            context.SaveChanges();
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
        public IActionResult Remove([FromRoute] int id)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var res = context.Notes.SingleOrDefault(el => el.Id == id);
            if (res == null || res.UserId != userId)
            {
                return NotFound();
            }
            context.Notes.Remove(res);
            context.SaveChanges();
            return Ok();
        }


        [Route("{id}"), HttpPatch]
        public IActionResult Update([FromRoute] int id, [FromBody] NotesDto d)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var res = context.Notes.SingleOrDefault(el => el.Id == id);
            if (res == null || res.UserId != userId)
            {
                return NotFound();
            }
            if (d.Content != null)
            {
                res.Content = d.Content;
                context.SaveChanges();
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
