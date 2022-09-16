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

app.MapGet("/get-transaction-by-id/{transactionId}", async (int transactionId) =>
{
    Transaction transactionToReturn = await TransactionsRepository.GetTransactionByIdAsync(transactionId);

    if (transactionToReturn != null)
    {
        return Results.Ok(transactionToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Transactions Endpoints");

app.MapPost("/create-transaction", async (Transaction transactionToCreate) =>
{
    bool createSuccessful = await TransactionsRepository.CreateTransactionAsync(transactionToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create successful!");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Transactions Endpoints");

app.MapPut("/update-transaction", async (Transaction transactionToUpdate) =>
{
    bool updateSuccessful = await TransactionsRepository.UpdateTransactionAsync(transactionToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update successful!");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Transactions Endpoints");

app.MapDelete("/delete-transaction-by-id/{transactionId}", async (int postId) =>
{
    bool updateSuccessful = await TransactionsRepository.DeleteTransactionAsync(postId);

    if (updateSuccessful)
    {
        return Results.Ok("Delete successful!");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Transactions Endpoints");

app.Run();
