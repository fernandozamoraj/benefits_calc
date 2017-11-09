using System;

namespace PBC.Models
{
    /// <summary>
    /// CalculationResults - These are the results after the calculator 
    /// has performed the calculations
    /// </summary>
    public class CalculationResults
    {
        public Family Family { get; set; }

        public Decimal AnnualSalary { get; set; }

        public Decimal AnnualCosts { get; set; }

        public Decimal AdjustedPeriodAmount
        {
            get
            {
                return ((AnnualSalary - AnnualCosts) + EmployerDiscounts) / 26;
            }
        }

        public Decimal EmployerDiscounts { get; set; }
    }
}
