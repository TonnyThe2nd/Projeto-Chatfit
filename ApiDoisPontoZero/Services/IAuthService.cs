namespace ApiDoisPontoZero.Services
{
    public interface IAuthService
    {
        public string GerarToken(string email, string senha);
    }
}
