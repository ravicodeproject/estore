using System;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace api.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User
                .FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IEmployeeRepository>();
            var user = await repo.GetEmployee(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}