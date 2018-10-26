using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using notes.Helpers;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using notes.Services;
using notes.Dtos;
using notes.Entities;

namespace notes.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        public UsersController(
            IUserService userService,
            IMapper mapper
        )
        {
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            var token = _userService.GetToken(user);

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
            var user = _mapper.Map<User>(userDto);

            try
            {
                // save 
                var createdUser = _userService.Create(user, userDto.Password);
                return Ok(new
                {
                    Id = createdUser.Id,
                    Username = createdUser.Username,
                    FirstName = createdUser.FirstName,
                    LastName = createdUser.LastName,
                    Token = _userService.GetToken(user)
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
            return Ok("");
        }
    }
}
