using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.Entities;

namespace PaymentService.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly PaymentDbContext context;

        public PaymentRepository(PaymentDbContext context)
        {
            this.context = context;
        }

        public async Task SaveAsync(Payment payment)
        {
            context.Payments.Add(payment);
            await context.SaveChangesAsync();
        }

        public async Task<Payment?> GetByOrderIdAsync(string orderId)
        {
            return await context.Payments
                .FirstOrDefaultAsync(x => x.RazorpayOrderId == orderId);
        }

        public async Task UpdateAsync(Payment payment)
        {
            context.Payments.Update(payment);
            await context.SaveChangesAsync();
        }

        public async Task<List<Payment>> GetByDonorIdAsync(long donorId)
        {
            return await context.Payments
                .Where(x => x.DonorId == donorId)
                .ToListAsync();
        }

        public async Task<List<Payment>> GetByIndustryIdAsync(long industryId)
        {
            return await context.Payments
                .Where(x => x.IndustryId == industryId)
                .ToListAsync();
        }
    }
}