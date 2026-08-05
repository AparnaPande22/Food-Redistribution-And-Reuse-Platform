using PaymentService.Entities;

namespace PaymentService.Repository
{
    public interface IPaymentRepository
    {
        Task SaveAsync(Payment payment);

        Task<Payment?> GetByOrderIdAsync(string orderId);

        Task UpdateAsync(Payment payment);

        Task<List<Payment>> GetByDonorIdAsync(long donorId);

        Task<List<Payment>> GetByIndustryIdAsync(long industryId);
    }
}