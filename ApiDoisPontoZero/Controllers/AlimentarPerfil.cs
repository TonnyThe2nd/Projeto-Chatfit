using ApiDoisPontoZero.Data;
using ApiDoisPontoZero.Models.Entities;
using ApiDoisPontoZero.Uteis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiDoisPontoZero.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlimentarPerfil : ControllerBase
    {
        private readonly AppDbContext context;
        public AlimentarPerfil(AppDbContext _context)
        {
            context = _context;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<DadosUsuario> Get(int Id)
        {
            var usuario = context.cadastro.Where(_ => _.Id == Id).Select(_ => new { _.UserName, _.Numero_Celular, _.Email, _.dataNascimento }).FirstOrDefault();
            if (usuario == null)
            {
                return NotFound("Usuário não encontrado");
            }
            return Ok(usuario);
        }
        [HttpPatch]
        [Authorize]
        public ActionResult Patch([FromBody] DadosUsuario usuario)
        {
            if (usuario == null || usuario.Id == 0)
            {
                return BadRequest("Id do usuário não informado");
            }

            var dadosAntigos = context.cadastro.FirstOrDefault(_ => _.Id == usuario.Id);
            if (dadosAntigos == null)
            {
                return NotFound("Usuário não encontrado");
            }
            if (!string.IsNullOrWhiteSpace(usuario.UserName) && usuario.UserName != dadosAntigos.UserName)
            {
                dadosAntigos.UserName = usuario.UserName;
            }

            if (!string.IsNullOrWhiteSpace(usuario.Email) && usuario.Email != dadosAntigos.Email)
            {
                if (!Verificacoes.VerificarEmail(usuario.Email))
                    return BadRequest("E-mail inválido");

                dadosAntigos.Email = usuario.Email;
            }

            if (!string.IsNullOrWhiteSpace(usuario.Numero_Celular) && usuario.Numero_Celular != dadosAntigos.Numero_Celular)
            {
                if (!Verificacoes.VerificarNumeroCelular(usuario.Numero_Celular))
                    return BadRequest("Número de celular inválido");

                dadosAntigos.Numero_Celular = usuario.Numero_Celular;
            }

            if (usuario.dataNascimento != default && usuario.dataNascimento != dadosAntigos.dataNascimento)
            {
                dadosAntigos.dataNascimento = usuario.dataNascimento;
            }

            try
            {
                context.SaveChanges();
                return Ok(new { message = "Perfil atualizado com sucesso" });
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao atualizar perfil: {e.Message}");
            }
        }

    }
}
