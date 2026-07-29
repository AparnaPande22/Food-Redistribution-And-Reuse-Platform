using Razorpay.Api;

namespace PaymentService.Services
{
    public interface IRazorpayService
    {
        Order CreateOrder(decimal amount);
    }
}