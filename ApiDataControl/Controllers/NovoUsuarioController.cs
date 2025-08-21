using System.Runtime.CompilerServices;
using ApiDoisPontoZero.Data;
using ApiDoisPontoZero.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiDoisPontoZero.Uteis;

namespace ApiDoisPontoZero.Controllers

{
    [ApiController]
    [Route("[controller]")]
    public class NovoUsuarioController : ControllerBase
    {
        private readonly ILogger<NovoUsuarioController> _logger;
        private readonly AppDbContext _context;
        public NovoUsuarioController(ILogger<NovoUsuarioController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }
        [HttpPost]
        public IActionResult Post([FromBody] DadosUsuario cadastro)
        {
            try
            {
                if (cadastro == null)
                {
                    return BadRequest("Dados insuficientes");
                }
                if (Verificacoes.VerificarEmail(cadastro.Email))
                {
                    if (Verificacoes.VerificarNumeroCelular(cadastro.Numero_Celular))
                    {
                        if (!_context.cadastro.Any(_ => _.Email == cadastro.Email))
                        {
                            if (!_context.cadastro.Any(_ => _.Numero_Celular == cadastro.Numero_Celular))
                            {
                                if (new DateOnly(cadastro.dataNascimento.Year, cadastro.dataNascimento.Month, cadastro.dataNascimento.Day) < new DateOnly(2011, 01, 01))
                                {
                                    cadastro.Senha = SenhaHash.GerarHash(cadastro.Senha);
                                    _context.cadastro.Add(cadastro);
                                    _context.SaveChanges();
                                    return Ok();
                                } else { return Conflict("Idade insuficiente! "); }
                            }else { return Conflict("Número de celular já cadastrado"); }
                        }
                        else { return Conflict("E-mail já cadastrado"); }
                    }
                    else { return Conflict("Número de celular inválido"); }
                }
                else { return Conflict("E-mail inválido"); }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPatch]
        public IActionResult Patch([FromBody] DadosUsuario cadastro)
        {
            return Ok();
        }
    }
}
