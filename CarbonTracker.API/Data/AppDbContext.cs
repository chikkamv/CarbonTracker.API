using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<CarbonRecord> CarbonRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarbonRecord>().ToTable("carbonrecords");

            // Optional: Customize column names if you want to keep lowercase convention
            modelBuilder.Entity<CarbonRecord>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Timestamp).HasColumnName("timestamp");
                entity.Property(e => e.Intensity).HasColumnName("intensity");
                entity.Property(e => e.FuelType).HasColumnName("fueltype");
                entity.Property(e => e.Percentage).HasColumnName("percentage");
            });
        }
    }
}
