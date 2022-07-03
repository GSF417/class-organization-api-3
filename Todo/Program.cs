using Todo.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});



var app = builder.Build();


app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();



app.MapControllers();

app.Run();
