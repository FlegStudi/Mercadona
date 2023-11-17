using Microsoft.AspNetCore.Authorization;
using Mercadona.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.Mappers;
using System.Reflection.Emit;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mercadona.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly Db_Context _context;
    private string pathImages = @"C:\Mercadona\images";

    private readonly ILogger<ProductsController> _logger;

    public ProductsController(Db_Context context, string pathImage)
    {
        _context = context;
        pathImages = pathImage;

    }

    [HttpGet("testApi")]
    public string testApi()
    {
        return "api ok";
    }

    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        var categories = _context.Categories.ToList();
        return Ok(categories);
    }

    [HttpGet("promotions")]
    public IActionResult GetPromotions()
    {
        var promotions = _context.Promotions.ToList();
        return Ok(promotions);
    }

    [HttpGet("products")]
    public IActionResult GetProducts()
    {

        try
        {
            var results = _context.Products.ToList();
            var result = _context.Products
        .Select(p => new
        {
            productId = p.ProductId,
            label = p.Label,
            description = p.Description,
            price = p.Price,
            //image = Convert.ToBase64String(System.IO.File.ReadAllBytes(p.ImagePath)),
            image = p.ImagePath,
            category = p.Category,
            promotion = p.Promotion
        })
        .ToList()
        .OrderByDescending(p => p.productId);
            return Ok(result);
        }
        catch (Exception err)
        {

            return StatusCode(500, err.Message);

        }

    }


    [HttpPost("addProduct")]
    public async Task<IActionResult> AddProduct([FromForm] ProductMapper productM)
    {
        var category= _context.Categories.Where(c => c.CategoryId == productM.CategoryId).FirstOrDefault();
        var product = new Product();
        product.Label = productM.Label;
        product.Description = productM.Description;
        product.Price = productM.Price;
        product.Category = category;
        if (productM.PromotionId > 0)
        {
            var promotion = _context.Promotions.Where(p => p.PromotionId == productM.PromotionId).FirstOrDefault();
            product.Promotion = promotion;
        }

        var file = productM.Image;
        // Enregistrer l'image sur le serveur


        if (file != null && file.Length > 0)
        {
           // product.ImagePath = _imageService.UploadImageToAzure(file);
           if (!Directory.Exists(pathImages))
             {
                 Directory.CreateDirectory(pathImages);
             }
             string imageName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

             var filePath = Path.Combine(pathImages, imageName);
             using (var stream = new FileStream(filePath, FileMode.Create))
             {
                 await file.CopyToAsync(stream);
             }
            // Mettre à jour le chemin d'accès du fichier dans la base de données
            //product.ImagePath = filePath;

        }
        try
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }



    }

    [Authorize]
    [HttpPost("addCategory")]
    public IActionResult AddCategory([FromBody] string label)
    {
        var category = new Category();
        category.Label = label;
        _context.Categories.Add(category);
        _context.SaveChanges();
        return Ok(category);
    }

    [Authorize]
    [HttpPost("addPromotion")]
    public IActionResult AddPromotion(Promotion promotion)
    {
        var prom = new Promotion();
        prom.Start = promotion.Start;
        prom.End = promotion.End;
        prom.Discount = promotion.Discount;
        _context.Promotions.Add(prom);
        _context.SaveChanges();
        return Ok(prom);
    }

}
