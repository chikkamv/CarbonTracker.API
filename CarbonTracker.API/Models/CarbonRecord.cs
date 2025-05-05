using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CarbonRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public int Intensity { get; set; }  // Actual carbon intensity in gCO2/kWh

        [Required]
        public string FuelType { get; set; } = string.Empty; 

        [Required]
        public double Percentage { get; set; } 
    }
}
