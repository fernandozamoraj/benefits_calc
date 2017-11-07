using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PBC.Models;
using PBC.App.Models;
using PBC.Services;

namespace PBC.Tests
{
    [TestClass]
    public class WhenOneEmployeeNameStartsWithA
    {
        protected Family _family;
        protected Calculator _calculator;
        protected AppConfiguration _appConfig;
        protected CalculationResults _calculation;

        [TestInitialize]
        public void SetUp()
        {
            _family = new Family
            {
                Members = new List<Person>{
                 new Person{
                     IsEmployee = true,
                     FirstName = "Aaron",
                     LastName = "Smith"
                 }
              },
            };

            _calculator = new Calculator();
            _appConfig = new AppConfiguration();

            _calculation = _calculator.RunCalculations(_family, _appConfig);
        }

        [TestMethod]
        public void AnnualCostsShouldBe1000()
        {
            Assert.AreEqual(1000, _calculation.AnnualCosts, "Annual salary for one employee");
        }

        [TestMethod]
        public void AdjustedPeriodAmountForOneEmmpoyee()
        {
            decimal adjustedPeriodAmount = ((_appConfig.AnnualSalary - 1000)+_calculation.EmployerDiscounts) / 26;
            Assert.AreEqual(adjustedPeriodAmount, _calculation.AdjustPeriodAmount, "Adjusted Period Amount for one employee");
        }

        [TestMethod]
        public void EmployerDiscountsShouldBe()
        {
            Assert.AreEqual(100, _calculation.EmployerDiscounts, "Employer discounts should be 0");
        }
    }
}
