using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(EmployeeForRegisterDto employeeForRegisterDto)
        {

            employeeForRegisterDto.Username = employeeForRegisterDto.Username.ToLower();

            if (await _repo.EmployeeExists(employeeForRegisterDto.Username))
                return BadRequest("Employee already exists");

            var userToCreate = _mapper.Map<Employee>(employeeForRegisterDto);

            var createdEmployee = await _repo.Register(userToCreate, employeeForRegisterDto.password);

            var employeeToReturn = _mapper.Map<EmployeeForDetailedDto>(createdEmployee);

            return CreatedAtRoute("GetEmployee",new{ Controller = "Employees", id = createdEmployee.Eid}, employeeToReturn);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(EmployeeForLoginDto userForLoginDto)
        {
            // throw new Exception("Login failed");

            var userFromRepo = await _repo.Login(userForLoginDto.username.ToLower(), userForLoginDto.password);
            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Eid.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<EmployeeForListDto>(userFromRepo);

           
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}