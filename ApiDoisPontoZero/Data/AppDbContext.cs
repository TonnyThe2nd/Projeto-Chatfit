using ApiDoisPontoZero.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiDoisPontoZero.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<DadosUsuario> cadastro { get; set; }
    }
}
