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
            var bookList = _bookContext.Books
                .ToList(); // Load everything into a List

            // Apply sorting
            if (sortOrder.ToLower() == "asc")
            {
                bookList = bookList.OrderBy(b => b.Title).ToList();
            }
            else
            {
                bookList = bookList.OrderByDescending(b => b.Title).ToList();
            }

            // Apply pagination
            var paginatedBooks = bookList
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = bookList.Count; // Count from the already loaded list

            var exportObject = new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            };

            return Ok(exportObject);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

    }
}
