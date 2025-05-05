using backend.Controllers;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;


[TestClass]
public class CarbonRecordsControllerTests
{
    private AppDbContext _context;
    private CarbonRecordsController _controller;

    [TestInitialize]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb") // same name across test methods = shared
            .Options;

        _context = new AppDbContext(options);
        _controller = new CarbonRecordsController(_context);

        var builder = WebApplication.CreateBuilder();
    }



    [TestMethod]
    public async Task CanCreateAndRetrieveCarbonRecord()
    {
        // Arrange
        var newRecord = new CarbonRecord
        {
            Timestamp = DateTime.UtcNow,
            FuelType = "Diesel",
            Intensity = 123,
            Percentage = 50
        };

        // Act - Call your controller's POST method
        var result = await _controller.Create(newRecord);

        // Assert - Check if it saved
        var savedRecord = _context.CarbonRecords.FirstOrDefault();
        Assert.IsNotNull(savedRecord);
        Assert.AreEqual("Diesel", savedRecord.FuelType);
        Assert.AreEqual(123, savedRecord.Intensity);
    }

    [TestMethod]
    public async Task CanUpdateCarbonRecord()
    {
        // Arrange: Add initial record
        var original = new CarbonRecord
        {
            Timestamp = DateTime.UtcNow,
            FuelType = "Coal",
            Intensity = 100,
            Percentage = 40
        };
        _context.CarbonRecords.Add(original);
        _context.SaveChanges();

        // Act: Update the record
        original.Intensity = 200;
        _context.CarbonRecords.Update(original);
        _context.SaveChanges();

        // Assert: Ensure it updated
        var updated = _context.CarbonRecords.First(r => r.Id == original.Id);
        Assert.AreEqual(200, updated.Intensity);
    }

    [TestMethod]
    public async Task CanDeleteCarbonRecord()
    {
        // Arrange: Add a record to delete
        var record = new CarbonRecord
        {
            Timestamp = DateTime.UtcNow,
            FuelType = "Gas",
            Intensity = 90,
            Percentage = 30
        };
        _context.CarbonRecords.Add(record);
        _context.SaveChanges();

        // Act: Delete the record
        _context.CarbonRecords.Remove(record);
        _context.SaveChanges();

        // Assert: Ensure it's gone
        var deleted = _context.CarbonRecords.FirstOrDefault(r => r.Id == record.Id);
        Assert.IsNull(deleted);
    }



}
