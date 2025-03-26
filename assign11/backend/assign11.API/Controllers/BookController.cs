using assign11.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace assign11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var bookQuery = _bookContext.Books.AsQueryable(); // Start with a queryable collection

            if (sortOrder.ToLower() == "asc")
            {
                bookQuery = bookQuery.OrderBy(b => b.Title);
            }
            else
            {
                bookQuery = bookQuery.OrderByDescending(b => b.Title);
            }

            var bookList = bookQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var exportObject = new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(exportObject);
        }

    }
}
