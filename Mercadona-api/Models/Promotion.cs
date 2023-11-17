namespace Mercadona.Models;

public class Promotion
{
    public int PromotionId { get; set; }    
    public DateTime Start { get; set; }

    public DateTime End { get; set; }

    public float Discount { get; set;}

}
