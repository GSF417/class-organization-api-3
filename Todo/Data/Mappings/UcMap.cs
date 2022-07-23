using Todo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Todo.Data.Mappings
{
    public class UcMap : IEntityTypeConfiguration<Uc>
    {
        public void Configure(EntityTypeBuilder<Uc> builder)
        {
            builder.ToTable("Ucs");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.UC)
                .IsRequired()
                .HasColumnName("UC")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(150);

            builder.Property(x => x.UcPrereq)
                .IsRequired()
                .HasColumnName("UcPrereq")
                .HasColumnType("NVARCHAR")
                .HasMaxLength(200);

        }
    }
}