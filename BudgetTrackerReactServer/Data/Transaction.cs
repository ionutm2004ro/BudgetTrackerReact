using System.ComponentModel.DataAnnotations;

namespace BudgetTrackerReactServer.Data
{
    internal sealed class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        [Required]
        public float Value { get; set; }
        [MaxLength(200)]
        public string Note { get; set; } = string.Empty;
    }
}
