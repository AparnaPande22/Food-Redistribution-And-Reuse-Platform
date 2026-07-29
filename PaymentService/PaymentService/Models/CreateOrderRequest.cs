namespace PaymentService.Models
{
    public class CreateOrderRequest
    {
        public long DonorId { get; set; }

        public long IndustryId { get; set; }

        public decimal Amount { get; set; }
    }
}