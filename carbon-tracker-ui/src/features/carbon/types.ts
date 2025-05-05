export interface CarbonRecord {
  id: number;
  timestamp: string; // or Date, depending on how you're handling it
  intensity: number;
  fuelType: string;
  percentage: number;
}