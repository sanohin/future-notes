using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using notes.Helpers;
using Microsoft.AspNetCore.Authorization;
using notes.Services;
using notes.Dtos;
using notes.Entities;
using notes.Data;

namespace notes.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private IUserService userService;
        private IMapper mapper;
        private DataContext context;
        public UsersController(
            IUserService userService,
            IMapper mapper,
            DataContext context
        )
        {
            this.userService = userService;
            this.mapper = mapper;
            this.context = context;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            var token = userService.GetToken(user);

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = token
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            userDto.Id = 0;
            Console.Write(userDto);
            // map dto to entity
            var user = mapper.Map<User>(userDto);

            try
            {
                // save 
                var createdUser = userService.Create(user, userDto.Password);
                return Ok(new
                {
                    Id = createdUser.Id,
                    Username = createdUser.Username,
                    FirstName = createdUser.FirstName,
                    LastName = createdUser.LastName,
                    Token = userService.GetToken(user)
                });
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var user = this.context.Users.Single(el => el.Id == userId);
            return Ok(new
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.Username
            });
        }
    }
}
