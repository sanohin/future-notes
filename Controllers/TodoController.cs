
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using notes.Entities;
using notes.Helpers;

namespace notes.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        DataContext client;
        private readonly UserManager<User> _userManager;
        public TodosController(DataContext client)
        {
            this.client = client;
        }

        [HttpPost]
        public IActionResult Add([FromBody] TodosDto createData)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            Console.Write(userId);
            var todo = new Todo()
            {
                Title = createData.Title,
            };
            client.Todos.Add(todo);
            client.SaveChanges();
            return Ok(todo);

        }
        [HttpGet]
        public ActionResult<TodosDto[]> GetList([FromRoute] int id)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            Console.Write(userId);
            return Ok(client.Todos.ToArray());
        }

        [Route("{id}"), HttpGet]
        public ActionResult<TodosDto> Get([FromRoute] int id)
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            Console.Write(userId);
            // Add implementation   
            var res = client.Todos.SingleOrDefault(el => el.Id == id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }


        [Route("{id}"), HttpDelete]
        public IActionResult Remove([FromRoute] int id)
        {
            // Add implementation   
            var res = client.Todos.SingleOrDefault(el => el.Id == id);
            if (res == null)
            {
                return NotFound();
            }
            client.Todos.Remove(res);
            client.SaveChanges();
            return Ok();
        }


        [Route("{id}"), HttpPatch]
        public IActionResult Update([FromRoute] int id, [FromBody] TodosDto d)
        {

            return Ok();
        }
    }

    public class TodosDto
    {
        public string Title { get; set; }
        public int? UserId { get; set; }
    }
}
