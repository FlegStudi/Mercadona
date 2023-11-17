namespace Mercadona.Models;

public class Product
{
    public int ProductId { get; set; }
    public string Label { get; set; }
    public string Description { get; set; } 
    public float Price { get; set; }
    public string ImagePath { get; set; }


    public virtual Category Category { get; set; }  

    public virtual Promotion? Promotion { get; set; }   
}
