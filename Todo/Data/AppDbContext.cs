using Microsoft.EntityFrameworkCore;
using Todo.Models;
using Todo.Data.Mappings;

namespace Todo.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<TodoUser> TodoUsers { get; set; }
        public DbSet<Uc> Ucs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("DataSource=app.db;Cache=Shared");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMap());
            modelBuilder.ApplyConfiguration(new UcMap());
        } 
    }
}