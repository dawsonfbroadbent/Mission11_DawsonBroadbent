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
    public IActionResult Get(int pageSize = 10, int pageNum =1)
    {
        var books = _bookstoreContext.Books
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
