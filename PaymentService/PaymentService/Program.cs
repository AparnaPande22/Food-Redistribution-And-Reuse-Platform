
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.Repository;
using PaymentService.Services;

var builder = WebApplication.CreateBuilder(args);

// ======================================================
// SERVICES
// ======================================================

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ======================================================
// DATABASE
// ======================================================

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "DefaultConnection is missing from appsettings.json."
    );
}

builder.Services.AddDbContext<PaymentDbContext>(options =>
{
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    );
});

// ======================================================
// DEPENDENCY INJECTION
// ======================================================

// Razorpay service
builder.Services.AddScoped<IRazorpayService, RazorpayService>();

// Payment repository
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();

// ======================================================
// CORS
// ======================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// ======================================================
// BUILD APPLICATION
// ======================================================

var app = builder.Build();

// ======================================================
// GLOBAL EXCEPTION HANDLING
// ======================================================

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var exceptionHandler =
            context.Features.Get<IExceptionHandlerFeature>();

        if (exceptionHandler?.Error != null)
        {
            var exception = exceptionHandler.Error;

            Console.WriteLine("======================================");
            Console.WriteLine("PAYMENT SERVICE ERROR");
            Console.WriteLine("======================================");
            Console.WriteLine(exception.Message);
            Console.WriteLine(exception.StackTrace);
            Console.WriteLine("======================================");

            await context.Response.WriteAsJsonAsync(new
            {
                success = false,
                message = exception.Message
            });
        }
    });
});

// ======================================================
// DATABASE MIGRATION
// ======================================================

try
{
    using var scope = app.Services.CreateScope();

    var db = scope.ServiceProvider
        .GetRequiredService<PaymentDbContext>();

    db.Database.Migrate();

    Console.WriteLine(
        "Payment database migration completed successfully."
    );
}
catch (Exception ex)
{
    Console.WriteLine("======================================");
    Console.WriteLine("DATABASE MIGRATION ERROR");
    Console.WriteLine("======================================");
    Console.WriteLine(ex.Message);
    Console.WriteLine(ex.StackTrace);
    Console.WriteLine("======================================");
}

// ======================================================
// SWAGGER
// ======================================================

app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint(
        "/swagger/v1/swagger.json",
        "Payment Service API V1"
    );

    options.RoutePrefix = "swagger";
});

// ======================================================
// HTTPS
// ======================================================

app.UseHttpsRedirection();

// ======================================================
// CORS
// ======================================================

app.UseCors("AllowFrontend");

// ======================================================
// AUTHORIZATION
// ======================================================

app.UseAuthorization();

// ======================================================
// CONTROLLERS
// ======================================================

app.MapControllers();

// ======================================================
// STARTUP INFORMATION
// ======================================================

Console.WriteLine();
Console.WriteLine("==============================================");
Console.WriteLine("       PAYMENT MICROSERVICE STARTED");
Console.WriteLine("==============================================");
Console.WriteLine("Swagger:");
Console.WriteLine("https://localhost:7186/swagger/index.html");
Console.WriteLine();
Console.WriteLine("Payment API:");
Console.WriteLine("https://localhost:7186/api/payment");
Console.WriteLine("==============================================");
Console.WriteLine();

app.Run();
