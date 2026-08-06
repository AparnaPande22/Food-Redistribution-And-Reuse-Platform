using Razorpay.Api;
namespace PaymentService.Services

{
    public class RazorpayService : IRazorpayService
    {
        private readonly IConfiguration configuration;

        public RazorpayService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public Order CreateOrder(decimal amount)
        {
            RazorpayClient client = new RazorpayClient(
       configuration["Razorpay:KeyId"],
       configuration["Razorpay:KeySecret"]);

            var options = new Dictionary<string, object>
{
    { "amount", (int)(amount * 100) },
    { "currency", "INR" },
    { "receipt", Guid.NewGuid().ToString() }
};

            return client.Order.Create(options);
        }
    }
}

