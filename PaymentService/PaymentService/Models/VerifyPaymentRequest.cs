using System.ComponentModel.DataAnnotations;

namespace PaymentService.Models
{
    public class VerifyPaymentRequest
    {
        [Required]
        public string OrderId { get; set; } = string.Empty;

        [Required]
        public string PaymentId { get; set; } = string.Empty;

        [Required]
        public string Signature { get; set; } = string.Empty;
    }
}
