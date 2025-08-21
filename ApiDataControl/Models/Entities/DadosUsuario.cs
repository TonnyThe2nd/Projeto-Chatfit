using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiDoisPontoZero.Models.Entities
{
    public class DadosUsuario
    {
        [Key]
        public int Id { get; set; }
        [JsonPropertyName("nome")]
        public string? UserName { get; set; }

        public string? Email { get; set; }
        public string? Senha { get; set; }
        [JsonPropertyName("data_nascimento")]
        public DateTime dataNascimento { get; set; }
        [JsonPropertyName("celular")]
        public string? Numero_Celular { get; set; }
    }
}
