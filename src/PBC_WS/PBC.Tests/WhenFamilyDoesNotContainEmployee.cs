using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PBC.Models;
using PBC.Services;

namespace PBC.Tests
{
    [TestClass]
    public class WhenFamilyDoesNotContainEmployee
    {
        protected FamilyValidator _familyValidator;
        protected Family _family;
        protected ValidationResult _validationResult;

        [TestInitialize]
        public void SetUp()
        {
            _familyValidator = new FamilyValidator();
            _family = new Family
            {
                Members = new List<Person>{
                 new Person{
                     IsEmployee = false,
                     FirstName = "Aaron",
                     LastName = "Smith"
                 }
              },
            };

            _validationResult = _familyValidator.Run(_family);
        }

        [TestMethod]
        public void ShouldReturnIsNotValid()
        {
            Assert.IsFalse(_validationResult.IsValid, "Should be invalid for missing employee");
        }

        [TestMethod]
        public void MessageShouldNotBeEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_validationResult.Message));
        }
    }
}
