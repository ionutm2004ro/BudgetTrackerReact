using Microsoft.EntityFrameworkCore;

namespace BudgetTrackerReactServer.Data
{
    internal static class TransactionsRepository
    {
        internal async static Task<List<Transaction>> GetTransactionsAsync()
        { 
            using (var db = new AppDBContext())
            {
                return await db.Transactions.ToListAsync();
            }
        }

        internal async static Task<Transaction> GetTransactionByIdAsync(int transactionId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Transactions.FirstOrDefaultAsync(transaction => transaction.TransactionId == transactionId);
            }
        }

        internal async static Task<bool> CreateTransactionAsync(Transaction newTransaction)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Transactions.AddAsync(newTransaction);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateTransactionAsync(Transaction updatedTransaction)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Transactions.Update(updatedTransaction);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }


        internal async static Task<bool> DeleteTransactionAsync(int transactionId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Transaction transactionToDelete = await GetTransactionByIdAsync(transactionId);
                    db.Remove(transactionToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}
