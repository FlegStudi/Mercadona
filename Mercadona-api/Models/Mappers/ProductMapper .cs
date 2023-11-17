using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace Backend.Models.Mappers
{
    public class ProductMapper
    {
        public string Label { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public IFormFile Image { get; set; }
        public int CategoryId { get; set; }
        public int PromotionId { get; set; } = 0;
    }
}
