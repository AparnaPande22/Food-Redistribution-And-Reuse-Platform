using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.Repository;
using PaymentService.Services;

var builder = WebApplication.CreateBuilder(args);


// Add Controllers
builder.Services.AddControllers();


// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Database Configuration
builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    ));


// Dependency Injection

// Razorpay Service
builder.Services.AddScoped<IRazorpayService, RazorpayService>();

// Repository
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PaymentDbContext>();
    db.Database.EnsureCreated();
}


// HTTP Pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();


app.MapControllers();


app.Run();