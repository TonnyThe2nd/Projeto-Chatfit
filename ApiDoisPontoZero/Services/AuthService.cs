using ApiDoisPontoZero.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace ApiDoisPontoZero.Services
{
    public class AuthService : IAuthService
    {
        public readonly IConfiguration _config;
        public readonly AppDbContext _context;
        public AuthService(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
        }

        public string GerarToken(string email, string senha)
        {
            var usuario = _context.cadastro.FirstOrDefault(_ => _.Email == email && _.Senha == senha);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Double.Parse(_config["Jwt:ExpiresInMinutes"])),
                signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
