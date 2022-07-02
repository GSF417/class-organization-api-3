using Todo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Todo.Data.Mappings
{
    public class UserMap : IEntityTypeConfiguration<TodoUser>
    {
        public void Configure(EntityTypeBuilder<TodoUser> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnName("Name")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(80);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnName("Email")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(80);

            builder
                .HasIndex(x => x.Email, "IX_User_Email")
                .IsUnique();

            builder.Property(x => x.Password)
                .IsRequired()
                .HasColumnName("Password")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(80);

            builder.Property(x => x.UCs)
                .HasColumnName("UCs")
                .HasColumnType("TEXT");

        }
    }

}