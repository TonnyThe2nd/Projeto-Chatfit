namespace ApiDoisPontoZero.Uteis
{
    public class Verificacoes
    {
        public static bool VerificarEmail(string email)
        {
            var dominios = new[] { "@gmail.com", "@outlook.com", "@yahoo.com", "@hotmail.com" };
            return dominios.Any(_ => email.EndsWith(_, StringComparison.OrdinalIgnoreCase));
        }
        public static bool VerificarNumeroCelular(string numeroCelular)
        {
            if (numeroCelular.Length == 11 && numeroCelular.All(char.IsDigit))
            {
                return true;
            }
            return false;
        }
    }
}
