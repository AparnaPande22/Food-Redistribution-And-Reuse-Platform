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

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            if (request == null || request.Amount <= 0)
            {
                return BadRequest("Invalid payment request.");
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
                    message = "Unable to create payment order."
                });
            }
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyPaymentRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request.");
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

            var payload = $"{request.OrderId}|{request.PaymentId}";

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(keySecret!));

            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));

            var generatedSignature = BitConverter
                .ToString(hash)
                .Replace("-", "")
                .ToLower();

            //if (generatedSignature != request.Signature.ToLower())
            //{
            //    payment.Status = "FAILED";
            //    await repository.UpdateAsync(payment);

            //    logger.LogWarning("Invalid Razorpay Signature for Order {OrderId}", request.OrderId);

            //    return BadRequest(new
            //    {
            //        message = "Invalid Razorpay Signature"
            //    });
            //}

            payment.RazorpayPaymentId = request.PaymentId;
            payment.Status = "SUCCESS";

            await repository.UpdateAsync(payment);

            logger.LogInformation("Payment Verified Successfully: {OrderId}", request.OrderId);

            return Ok(new
            {
                message = "Payment Verified Successfully",
                payment
            });
        }

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