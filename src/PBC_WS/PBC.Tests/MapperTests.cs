using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PBC.Models;
using PBC.App.Models;
using PBC.App.Services;
using PBC.Services;

namespace PBC.Tests
{
    [TestClass]
    public class MapperTests
    {
        protected Family _family;
        protected Calculator _calculator;
        protected AppConfiguration _appConfig;
        protected ModelMapper _mapper;
        protected CalculatedResultsModel _results;
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
            _mapper = new ModelMapper();
            _results = _mapper.MapToResults(_calculation);
        }

        [TestMethod]
        public void AnnualCostsShouldBe1000()
        {
            Assert.AreEqual(_calculation.AnnualCosts, _results.AnnualCosts, "Annual salary for one employee");
        }

        [TestMethod]
        public void AdjustedPeriodAmountForOneEmmpoyee()
        {
            Assert.AreEqual(_calculation.AdjustedPeriodAmount, _results.AdjustedPeriodPayAmount, "Adjusted Period Amount for one employee");
        }

        [TestMethod]
        public void EmployerDiscountsShouldBe()
        {
            Assert.AreEqual(_calculation.EmployerDiscounts, _results.EmployerDiscounts, "Employer discounts should be 0");
        }
    }
}
