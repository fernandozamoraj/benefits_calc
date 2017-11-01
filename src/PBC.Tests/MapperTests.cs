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
    public class MapperTests
    {
        protected Family _family;
        protected Calculation _calculation;
        protected AppConfiguration _appConfig;
        protected ModelMapper _mapper;
        protected CalculatedResultsModel _results;

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

            _calculation = new Calculation();
            _appConfig = new AppConfiguration();

            _calculation.RunCalculations(_family, _appConfig);
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
            Assert.AreEqual(_calculation.AdjustPeriodAmount, _results.AdjustedPeriodPayAmount, "Adjusted Period Amount for one employee");
        }

        [TestMethod]
        public void EmployerDiscountsShouldBe()
        {
            Assert.AreEqual(_calculation.EmployerDiscounts, _results.EmployerDiscounts, "Employer discounts should be 0");
        }
    }
}
