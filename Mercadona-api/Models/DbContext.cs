using Microsoft.EntityFrameworkCore;

namespace Mercadona.Models;

    public class Db_Context : DbContext
    {
        public Db_Context(DbContextOptions<Db_Context> options)
                : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<User> Users { get; set; }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //}
    }
