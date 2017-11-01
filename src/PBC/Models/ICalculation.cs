using System;
namespace PBC.Models
{
    public interface ICalculation
    {
        decimal AdjustPeriodAmount { get; }
        decimal AnnualCosts { get; set; }
        decimal AnnualSalary { get; set; }
        decimal EmployerDiscounts { get; set; }
        Family Family { get; set; }
        void RunCalculations(Family family, IAppConfiguration appConfig);
    }
}
