using Razorpay.Api;
namespace PaymentService.Services    

{
    public class RazorpayService: IRazorpayService
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

            Dictionary<string, object> options = new();

            options.Add("amount", amount * 100);
            options.Add("currency", "INR");
            options.Add("receipt", Guid.NewGuid().ToString());

            return client.Order.Create(options);
        }
    }
}

