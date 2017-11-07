using PBC.Models;

namespace PBC.Services
{
    public class Calculator : ICalculator
    {
        public CalculationResults RunCalculations(Family family, IAppConfiguration appConfig)
        {
            decimal totalAnnualCosts = 0;
            decimal employerDiscounts = 0;
            decimal annualSalary = appConfig.AnnualSalary;

            foreach (Person p in family.Members)
            {
                decimal annualCosts = 0;

                if (p.IsEmployee)
                {
                    annualCosts = appConfig.AnnualCostPerEmployee;
                }
                else
                {
                    annualCosts = appConfig.AnnualCostPerMember;
                }

                totalAnnualCosts += annualCosts;

                if (QualifiesForDiscount(p.FirstName))
                {
                    employerDiscounts += (appConfig.BonusDiscountPercentage * .010M) * annualCosts;
                }
            }

            CalculationResults results = new CalculationResults
            {
                AnnualCosts = totalAnnualCosts,
                EmployerDiscounts = employerDiscounts,
                AnnualSalary = annualSalary,
                Family = family
            };
            
            return results;
        }

        private bool QualifiesForDiscount(string name)
        {
            if (!string.IsNullOrEmpty(name) && name.ToUpper()[0] == 'A')
            {
                return true;
            }

            return false;
        }
    }
}
