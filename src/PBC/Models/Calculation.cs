using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PBC.Models
{
    public class Calculation : PBC.Models.ICalculation
    {
        private Family _family;
        private Decimal _annualSalary;
        private Decimal _annualCosts;
        private Decimal _employerDiscounts;
        private IAppConfiguration _appConfig;

        /// <summary>
        /// RunCalculations - Runs calculation based on business rules
        /// </summary>
        /// <param name="family"></param>
        /// <param name="appConfig"></param>
        public void RunCalculations(Family family, IAppConfiguration appConfig)
        {
            _appConfig = appConfig;
            _family = family;
            _annualCosts = 0;
            _employerDiscounts = 0;
            _annualSalary = _appConfig.AnnualSalary;

            foreach (Person p in _family.Members)
            {
                decimal annualCosts = 0;

                if (p.IsEmployee)
                {
                    annualCosts = _appConfig.AnnualCostPerEmployee;
                }
                else
                {
                    annualCosts = _appConfig.AnnualCostPerMember;
                }

                _annualCosts += annualCosts;

                if (QualifiesForDiscount(p.FirstName))
                {
                    _employerDiscounts += (_appConfig.BonusDiscountPercentage * .010M) * annualCosts;
                }
            }
        }

        private bool QualifiesForDiscount(string name)
        {
            if (name.ToUpper()[0] == 'A')
            {
                return true;
            }

            return false;
        }

        public Family Family
        {
            get
            {
                return _family;
            }
            set
            {
                _family = value;
            }
        }

        public Decimal AnnualSalary
        {
            get
            {
                return _annualSalary;
            }
            set
            {
                _annualSalary = value;
            }
        }

        public Decimal AnnualCosts
        {
            get
            {
                return _annualCosts;
            }
            set
            {
                _annualCosts = value;
            }
        }

        public Decimal AdjustPeriodAmount
        {
            get
            {
                return ((_annualSalary - _annualCosts) + _employerDiscounts)/26;
            }
        }

        public Decimal EmployerDiscounts
        {
            get
            {
                return _employerDiscounts;
            }
            set
            {
                _employerDiscounts = value;
            }
        }
    }
}