using PBC.Services;

namespace PBC.App.Models
{
    /// <summary>
    /// AppConfiguration
    /// This information would be best handled coming from the configuration file
    /// That way if it changes it can be adjusted
    /// </summary>
    public class AppConfiguration : IAppConfiguration
    {
        public decimal AnnualSalary
        {
            get
            {
                return 2000 * 26;
            }
        }

        public decimal AnnualCostPerMember
        {
            get
            {
                return 500;
            }
        }

        public decimal AnnualCostPerEmployee
        {
            get
            {
                return 1000;
            }
        }

        public decimal BonusDiscountPercentage
        {
            get
            {
                return 10;
            }
        }
    }
}