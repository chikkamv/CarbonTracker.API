using backend.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;

namespace backend.Data
{
    public static class DbSeeder
    {
        public static void Seed(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            context.Database.EnsureCreated();

            if (!context.CarbonRecords.Any())
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "carbon-intensity-data.csv");

                using var reader = new StreamReader(filePath);

                var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = true,
                };

                using var csv = new CsvReader(reader, config);

                csv.Read();
                csv.ReadHeader();

                var records = new List<CarbonRecord>();

                while (csv.Read())
                {
                    var timestamp = DateTime.Parse(csv.GetField("from")).ToUniversalTime();

                    int intensity = csv.GetField<int>("intensity_actual");

                    var fuelTypes = new string[] { "gas", "coal", "biomass", "nuclear", "hydro", "imports", "wind", "solar", "other" };

                    foreach (var fuel in fuelTypes)
                    {
                        if (double.TryParse(csv.GetField(fuel), out double percentage))
                        {
                            records.Add(new CarbonRecord
                            {
                                Timestamp = timestamp,
                                Intensity = intensity,
                                FuelType = fuel,
                                Percentage = percentage
                            });
                        }
                    }
                }

                context.CarbonRecords.AddRange(records);
                context.SaveChanges();
            }
        }
    }
}
