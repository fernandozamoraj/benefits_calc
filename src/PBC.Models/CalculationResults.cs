using System;

namespace PBC.Models
{
    public class CalculationResults
    {
        public Family Family
        {
            get;set;
        }

        public Decimal AnnualSalary
        {
            get;set;
        }

        public Decimal AnnualCosts
        {
            get;set;
        }

        public Decimal AdjustPeriodAmount
        {
            get
            {
                return ((AnnualSalary - AnnualCosts) + EmployerDiscounts) / 26;
            }
        }

        public Decimal EmployerDiscounts
        {
            get;set;
        }
    }
}
