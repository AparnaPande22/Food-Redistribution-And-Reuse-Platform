namespace PaymentService.Models
{
    public class PaymentResponse
    {
        public string OrderId { get; set; } = "";

        public decimal Amount { get; set; }

        public string Currency { get; set; } = "";

        public string Key { get; set; } = "";
    }
}
