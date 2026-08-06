namespace PaymentService.Models
{
    public class PayoutResult
    {
        public bool Success { get; set; }

        // e.g. "NOT_STARTED" | "QUEUED" | "PROCESSING" | "PROCESSED" | "FAILED" | "NO_PAYOUT_ACCOUNT"
        public string Status { get; set; } = "NOT_STARTED";

        public string? RazorpayPayoutId { get; set; }

        public string? FailureReason { get; set; }
    }
}
