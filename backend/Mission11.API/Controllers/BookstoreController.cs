using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookstoreController : ControllerBase
{
    private BookstoreContext _bookstoreContext;
    public BookstoreController(BookstoreContext tempContext) => _bookstoreContext = tempContext;

    [HttpGet("AllBooks")]
    public IActionResult Get(
        int pageSize = 10,
        int pageNum = 1,
        string sortOrder = "asc",
        [FromQuery] List<string>? categories = null)
    {
        var booksQuery = _bookstoreContext.Books.AsQueryable();

        // Filter by category if any were selected
        if (categories != null && categories.Any())
        {
            booksQuery = booksQuery.Where(b => categories.Contains(b.Category));
        }

        // Sort by title
        booksQuery = string.Equals(sortOrder, "desc", StringComparison.OrdinalIgnoreCase)
            ? booksQuery.OrderByDescending(b => b.Title)
            : booksQuery.OrderBy(b => b.Title);

        // Count after filtering, before paging
        var totalNumBooks = booksQuery.Count();

        // Apply paging
        var books = booksQuery
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var returnedObject = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };

        return Ok(returnedObject);
    }
    
    [HttpGet("GetBookCategories")]
    public IActionResult GetBookTypes()
    {
        var bookTypes =
            _bookstoreContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
        return Ok(bookTypes);
    }
}
