namespace PBC.Services
{
    public interface IAppConfiguration
    {
        decimal AnnualCostPerEmployee { get; }
        decimal AnnualCostPerMember { get; }
        decimal AnnualSalary { get; }
        decimal BonusDiscountPercentage { get; }
    }
}
