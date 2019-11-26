using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Helpers;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _context;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeRepository context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET api/GetEmployees
        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery]UserParams userParams)
        {
            var currentEmployeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            userParams.Eid = currentEmployeeId;

            var employees= await _context.GetEmployees(userParams);

            var employeeForListDto = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees);

            Response.AddPagination(employees.CurrentPage, employees.PageSize, employees.TotalCount, employees.TotalPages);

            return Ok(employeeForListDto);
        }

        // GET api/GetEmployees/5
        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<IActionResult> GetEmployees(int id)
        {
            var employee = await _context.GetEmployee(id);
            var employeeForDetailedDto = _mapper.Map<EmployeeForDetailedDto>(employee);
            
            return Ok(employeeForDetailedDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeForUpdateDto employeeForUpdateDto){
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }

            var employeeFromDb = await _context.GetEmployee(id);
            _mapper.Map(employeeForUpdateDto,employeeFromDb);

            if(await _context.SaveAll())
            return NoContent();

            throw new System.Exception($"updating employee {id} failed on save.");
        }
    }
}