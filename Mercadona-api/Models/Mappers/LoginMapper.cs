using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mercadona.Models.Mappers.Login
{
    
    public class LoginModel
    {
        public string? Login { get; set; }
        public string? Password { get; set; }
    }
    public class AuthenticatedResponse
    {
        public string? Token { get; set; }
    }
}
