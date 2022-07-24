﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Todo.Data;

namespace Todo.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220723212800_CreateDatabase")]
    partial class CreateDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.11");

            modelBuilder.Entity("Todo.Models.TodoUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("Email");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("Name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("Password");

                    b.Property<string>("UCs")
                        .HasColumnType("TEXT")
                        .HasColumnName("UCs");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "Email" }, "IX_User_Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Todo.Models.Uc", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("UC")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("UC");

                    b.Property<string>("UcPrereq")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("UcPrereq");

                    b.HasKey("Id");

                    b.ToTable("Ucs");
                });
#pragma warning restore 612, 618
        }
    }
}