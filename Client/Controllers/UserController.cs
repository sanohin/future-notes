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
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

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
        private ILogger<UsersController> logger;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            DataContext context,
            ILogger<UsersController> logger
        )
        {
            this.userService = userService;
            this.mapper = mapper;
            this.context = context;
            this.logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = userService.Authenticate(userDto.Username, userDto.Password);
            logger.LogInformation($"users {context.Users.ToArray().Serialize()}");

            if (user == null)
            {
                logger.LogError($"no such user {userDto.Username}");

                return BadRequest(new { message = "Username or password is incorrect" });
            }
            var token = userService.GetToken(user);
            logger.LogInformation($"user {userDto.Username} logged in");

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
        public async Task<IActionResult> Register([FromBody]UserDto userDto)
        {
            userDto.Id = 0;
            Console.Write(userDto);
            // map dto to entity
            var user = mapper.Map<User>(userDto);

            try
            {
                // save 
                var createdUser = await userService.Create(user, userDto.Password);
                logger.LogInformation($"user created {userDto.Username}");

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
            logger.LogInformation($"user exists {user.Username}");

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
