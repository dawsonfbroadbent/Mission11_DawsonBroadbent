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
    public IActionResult Get(int pageSize = 10, int pageNum = 1, string sortOrder = "asc")
    {
        var booksQuery = _bookstoreContext.Books.AsQueryable();

        booksQuery = string.Equals(sortOrder, "desc", StringComparison.OrdinalIgnoreCase)
            ? booksQuery.OrderByDescending(b => b.Title)
            : booksQuery.OrderBy(b => b.Title);

        var books = booksQuery
            .Skip((pageNum -1) *  pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumBooks = _bookstoreContext.Books.Count();

        var returnedObject = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };
        
        return Ok(returnedObject);
    }
}
