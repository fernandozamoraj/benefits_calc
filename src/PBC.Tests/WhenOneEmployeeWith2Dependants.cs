using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PBC.Models;

namespace PBC.Tests
{
    [TestClass]
    class WhenOneEmployeeWith2Dependants
    {
        protected Family _family;
        protected Calculation _calculation;
        protected AppConfiguration _appConfig;

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

            _calculation = new Calculation();
            _appConfig = new AppConfiguration();

            _calculation.RunCalculations(_family, _appConfig);
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
            Assert.AreEqual(adjustedPeriodAmount, _calculation.AdjustPeriodAmount, "Adjusted Period Amount for one employee");
        }

        [TestMethod]
        public void EmployerDiscountsShouldBe200()
        {
            Assert.AreEqual(200, _calculation.EmployerDiscounts, "Employer discounts should be 200");
        }
    }
}
