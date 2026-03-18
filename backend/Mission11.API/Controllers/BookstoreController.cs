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

    [HttpGet("AllProjects")]
    public IActionResult Get(int pageSize = 10, int pageNum =1)
    {
        var projects = _bookstoreContext.Books
            .Skip((pageNum -1) *  pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumProjects = _bookstoreContext.Books.Count();

        var returnedObject = new
        {
            Projects = projects,
            TotalNumProjects = totalNumProjects
        };
        
        return Ok(returnedObject);
    }
}
