
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarbonRecordsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarbonRecordsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CarbonRecord>> GetById(int id)
        {
            var record = await _context.CarbonRecords.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            return record;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarbonRecord>>> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var skip = (page - 1) * pageSize;
            var pagedData = await _context.CarbonRecords
                                          .OrderByDescending(r => r.Timestamp)
                                          .Skip(skip)
                                          .Take(pageSize)
                                          .ToListAsync();

            var totalCount = await _context.CarbonRecords.CountAsync();

            return Ok(new { data = pagedData, total = totalCount });
        }

        [HttpPost]
        public async Task<ActionResult<CarbonRecord>> Create(CarbonRecord record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CarbonRecords.Add(record);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = record.Id }, record);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CarbonRecord updated)
        {
            if (id != updated.Id) return BadRequest("ID mismatch");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var record = await _context.CarbonRecords.FindAsync(id);
            if (record == null) return NotFound();
            _context.CarbonRecords.Remove(record);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
