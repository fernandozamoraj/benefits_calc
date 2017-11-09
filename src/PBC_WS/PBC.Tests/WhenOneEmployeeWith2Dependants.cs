using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PBC.Models;
using PBC.App.Models;
using PBC.Services;

namespace PBC.Tests
{
    [TestClass]
    public class WhenOneEmployeeWith2Dependants
    {

        protected CalculationResults _calculation;
        AppConfiguration _appConfig;

        [TestInitialize]
        public void SetUp()
        {
            Family family = new Family
            {
                Members = new List<Person>{
                 new Person{
                     IsEmployee = true,
                     FirstName = "Aaron",
                     LastName = "Smith"
                 },
                 new Person{
                     FirstName = "Ahmed",
                     LastName = "Smith"
                 },
                 new Person{
                     FirstName = "Amy",
                     LastName = "Smith"
                 }
              },

            };
            

            Calculator calculator = new Calculator();
            _appConfig = new AppConfiguration();

            _calculation = calculator.RunCalculations(family, _appConfig);
        }

        [TestMethod]
        public void AnnualCostsShouldBe1000()
        {
            Assert.AreEqual(2000, _calculation.AnnualCosts, "Annual salary for one employee + 2 dependents");
        }

        [TestMethod]
        public void AdjustedPeriodAmountForOneEmmpoyee()
        {
            decimal adjustedPeriodAmount = ((_appConfig.AnnualSalary - 2000) - 200) / 26;
            Assert.AreEqual(adjustedPeriodAmount, _calculation.AdjustedPeriodAmount, "Adjusted Period Amount for one employee");
        }

        [TestMethod]
        public void EmployerDiscountsShouldBe200()
        {
            Assert.AreEqual(200, _calculation.EmployerDiscounts, "Employer discounts should be 200");
        }
    }
}
