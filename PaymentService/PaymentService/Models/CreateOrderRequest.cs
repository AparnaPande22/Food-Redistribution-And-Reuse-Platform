using System.ComponentModel.DataAnnotations;

namespace PaymentService.Models
{
    public class CreateOrderRequest
    {
        [Required]
        public long DonorId { get; set; }
        [Required]
        public long IndustryId { get; set; }

        [Required]
        [Range(1, 1000000)]
        public decimal Amount { get; set; }
    }
}