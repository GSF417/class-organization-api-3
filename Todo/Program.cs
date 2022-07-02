using Todo.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>();
// builder.Services.AddDistributedMemoryCache();
// builder.Services.AddSession();

var app = builder.Build();

// app.UseSession();
app.MapControllers();

app.Run();
