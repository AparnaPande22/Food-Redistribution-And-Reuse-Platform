using System.ComponentModel.DataAnnotations;

namespace PaymentService.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        public long DonorId { get; set; }

        public long IndustryId { get; set; }

        public decimal Amount { get; set; }

        public string RazorpayOrderId { get; set; } = string.Empty;

        public string RazorpayPaymentId { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;
    }
}