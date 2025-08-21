using ApiDoisPontoZero.Data;
using ApiDoisPontoZero.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(_ =>
{
    _.AddPolicy("AllowAnyCors", _ => _.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
});

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddAuthentication(_ =>
{
    _.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    _.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    _.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(_ =>
{
    _.RequireHttpsMetadata = false;
    _.SaveToken = true;
    _.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(_ => _.UseSqlServer(builder.Configuration.GetConnectionString("UserDB")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAnyCors");
    app.MapOpenApi();
}
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
