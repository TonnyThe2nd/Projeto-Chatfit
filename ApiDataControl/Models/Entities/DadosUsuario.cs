using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiDoisPontoZero.Models.Entities
{
    public class DadosUsuario
    {
        [Key]
        public int Id { get; set; }
        [JsonPropertyName("Username")]
        public string? UserName { get; set; }
        [JsonPropertyName("Email")]
        public string? Email { get; set; }
        public string? Senha { get; set; }
        [JsonPropertyName("dataNascimento")]
        public DateTime dataNascimento { get; set; }
        [JsonPropertyName("Numero_Celular")]
        public string? Numero_Celular { get; set; }
    }
}
