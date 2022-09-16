using Microsoft.EntityFrameworkCore;

namespace BudgetTrackerReactServer.Data
{
    internal sealed class AppDBContext:DbContext
    {
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
            => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Transaction[] transactionsToSeed = new Transaction[6];

            for (int i = 1; i <= 6; i++) 
            {
                transactionsToSeed[i - 1] = new Transaction {
                    TransactionId = i,
                    Value = i,
                    Note = $"Transaction number {i}"
                };
            }

            modelBuilder.Entity<Transaction>().HasData(transactionsToSeed);
        }
    }
}
