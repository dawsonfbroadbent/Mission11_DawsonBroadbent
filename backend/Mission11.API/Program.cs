using Microsoft.EntityFrameworkCore;
using Mission11.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options => options.AddPolicy("AllowReactApp", policy =>
{
    policy.WithOrigins("http://localhost:3000", "https://gray-meadow-09abf901e.7.azurestaticapps.net")
           .AllowAnyHeader()
           .AllowAnyMethod();
}));

builder.Services.AddDbContext<BookstoreContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();