using PBC.Models;

namespace PBC.Services
{
    public class Calculator : ICalculator
    {
        /// <summary>
        /// Calculator is a service object in paradigm of Domain Driven Design (DDD).
        /// It performs calculations and returns the results of those calculations.
        /// </summary>
        /// <param name="family">this parameter is input to perform the calculations</param>
        /// <param name="appConfig">The app config is provides values necessary for the calculations</param>
        /// <returns></returns>
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

        /// <summary>
        /// A contrived rule that say that a family member qualifies for 
        /// discount if their name starts with the letter A
        /// </summary>
        /// <param name="name">input name to determine eligibility</param>
        /// <returns>True if the name qualifies. False otherwise.</returns>
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
