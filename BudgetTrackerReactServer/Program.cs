using BudgetTrackerReactServer.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions => 
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Budget Tracker React", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions => 
{
    swaggerUIOptions.DocumentTitle = "Budget Tracker React";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a transaction model");
    swaggerUIOptions.RoutePrefix = String.Empty;
});

app.UseHttpsRedirection();

app.MapGet("/get-all-transactions", async () => await TransactionsRepository.GetTransactionsAsync())
    .WithTags("Transactions Endpoints");

app.Run();
