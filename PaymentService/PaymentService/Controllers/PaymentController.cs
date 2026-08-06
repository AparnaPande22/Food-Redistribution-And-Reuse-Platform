using Microsoft.AspNetCore.Mvc;
using PaymentService.Models;
using PaymentService.Repository;
using PaymentService.Services;
using PaymentEntity = PaymentService.Entities.Payment;
using System.Security.Cryptography;
using System.Text;

namespace PaymentService.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class PaymentController : ControllerBase
    {
        private readonly IRazorpayService service;
        private readonly IPaymentRepository repository;
        private readonly IConfiguration configuration;
        private readonly ILogger<PaymentController> logger;

        public PaymentController(
            IRazorpayService service,
            IPaymentRepository repository,
            IConfiguration configuration,
            ILogger<PaymentController> logger)
        {
            this.service = service;
            this.repository = repository;
            this.configuration = configuration;
            this.logger = logger;
        }
        /// <summary>
        /// Donor registers (or updates) where their payouts should be sent.
        /// Must be called at least once before a payout can succeed.
        /// </summary>


        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var order = service.CreateOrder(request.Amount);

                PaymentEntity payment = new PaymentEntity
                {
                    DonorId = request.DonorId,
                    IndustryId = request.IndustryId,
                    Amount = request.Amount,
                    RazorpayOrderId = order["id"].ToString(),
                    Status = "CREATED"
                };

                await repository.SaveAsync(payment);

                logger.LogInformation("Payment Order Created: {OrderId}", payment.RazorpayOrderId);

                return Ok(new
                {
                    orderId = payment.RazorpayOrderId,
                    amount = request.Amount,
                    currency = "INR",
                    key = configuration["Razorpay:KeyId"]
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error while creating payment order.");

                return StatusCode(500, new
                {
                    message = ex.Message,
                    innerException = ex.InnerException?.Message
                });
            }
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyPaymentRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var payment = await repository.GetByOrderIdAsync(request.OrderId);

            if (payment == null)
            {
                return NotFound("Order not found.");
            }

            if (payment.Status == "SUCCESS")
            {
                return BadRequest("Payment already verified.");
            }

            var keySecret = configuration["Razorpay:KeySecret"];

            if (string.IsNullOrWhiteSpace(keySecret))
            {
                return StatusCode(500, "Razorpay Secret is missing.");
            }
            var payload = $"{request.OrderId}|{request.PaymentId}";

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(keySecret!));

            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));

            var generatedSignature = BitConverter
     .ToString(hash)
     .Replace("-", "")
     .ToLowerInvariant();

            if (!generatedSignature.Equals(
         request.Signature.Trim().ToLowerInvariant(),
         StringComparison.Ordinal))
            {
                payment.Status = "FAILED";
                await repository.UpdateAsync(payment);

                logger.LogWarning("Invalid Razorpay Signature for Order {OrderId}", request.OrderId);

                return BadRequest(new
                {
                    message = "Invalid Razorpay Signature"
                });
            }
            if (!string.IsNullOrEmpty(payment.RazorpayPaymentId))
            {
                return BadRequest("Payment already processed.");
            }

            payment.RazorpayPaymentId = request.PaymentId;
            payment.Status = "SUCCESS";
            payment.RazorpayPaymentId = request.PaymentId;


            await repository.UpdateAsync(payment);

            logger.LogInformation(
                "Payment verified successfully for Order {OrderId}",
                request.OrderId);
            return Ok(new
            {
                success = true,
                message = "Payment completed successfully. Amount credited to donor.",
                payment.Id,
                payment.RazorpayOrderId,
                payment.RazorpayPaymentId,
                payment.Amount,
                payment.Status
            });
        }

        /// <summary>
        /// Re-attempts the donor payout for a payment that was verified
        /// (Status == SUCCESS) but whose payout hasn't landed yet -
        /// e.g. because the donor registered their payout account late,
        /// or a previous payout attempt failed.
        /// </summary>
        

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetPayment(string orderId)
        {
            var payment = await repository.GetByOrderIdAsync(orderId);

            if (payment == null)
            {
                return NotFound("Payment not found.");
            }

            return Ok(payment);
        }

        [HttpGet("donor/{donorId}")]
        public async Task<IActionResult> DonorHistory(long donorId)
        {
            var payments = await repository.GetByDonorIdAsync(donorId);

            return Ok(payments);
        }

        [HttpGet("industry/{industryId}")]
        public async Task<IActionResult> IndustryHistory(long industryId)
        {
            var payments = await repository.GetByIndustryIdAsync(industryId);

            return Ok(payments);
        }
    }
}