using ApiDoisPontoZero.Data;
using ApiDoisPontoZero.Models;
using ApiDoisPontoZero.Services;
using ApiDoisPontoZero.Uteis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiDoisPontoZero.Controllers
{
    [ApiController] 
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _auth;
        private readonly AppDbContext _context;
        public LoginController(AppDbContext context, IAuthService auth)
        {
            _auth = auth;
            _context = context;
        }
        [HttpPost]
        public IActionResult Post([FromBody] Login login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Senha))
                return BadRequest("Email e senha são obrigatórios");

            if (!Verificacoes.VerificarEmail(login.Email))
                return Unauthorized("Credenciais inválidas");

            var senhaHash = SenhaHash.GerarHash(login.Senha);

            var usuario = _context.cadastro.FirstOrDefault(c => c.Email == login.Email && c.Senha == senhaHash);
            if (usuario == null)
                return Unauthorized("Credenciais inválidas");

            var token = _auth.GerarToken(usuario.Email, senhaHash);

            return Ok(new { Token = token });
        }

    }
}
