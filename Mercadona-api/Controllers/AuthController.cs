using Mercadona.Models.Mappers.Login;
using Mercadona.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class AuthController : Controller
    {
        private readonly Db_Context _context;
        public AuthController(Db_Context context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            if (user is null)
            {
                return BadRequest("Invalid client request");
            }

            var isUser = _context.Users.Where(u => u.Login == user.Login && u.Password == user.Password).FirstOrDefault();
            
            if (isUser != null)
            {
                var issuer = "https://mercadona-angular.azurewebsites.net/";
                var audience = "https://mercadona-api.azurewebsites.net/";

                //var issuer = "http://localhost:4200/";
                //var audience = ",http://localhost:17453/";

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(15),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new AuthenticatedResponse { Token = tokenString });
            }
            return Unauthorized();
        }
    }
}
