using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetTrackerReactServer.Data.Migrations
{
    public partial class FirstTransactionMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Value = table.Column<float>(type: "REAL", nullable: false),
                    Note = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Note", "Value" },
                values: new object[] { 1, "Transaction number1", 1f });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Note", "Value" },
                values: new object[] { 2, "Transaction number2", 2f });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Note", "Value" },
                values: new object[] { 3, "Transaction number3", 3f });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Note", "Value" },
                values: new object[] { 4, "Transaction number4", 4f });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Note", "Value" },
                values: new object[] { 5, "Transaction number5", 5f });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "TransactionId", "Note", "Value" },
                values: new object[] { 6, "Transaction number6", 6f });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
