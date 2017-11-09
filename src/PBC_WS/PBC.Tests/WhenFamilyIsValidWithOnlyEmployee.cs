using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PBC.Models;
using PBC.Services;

namespace PBC.Tests
{
    [TestClass]
    public class WhenFamilyIsValidWithOnlyEmployee
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
                Members = new List<Person>
                {
                    new Person
                    {
                        FirstName = "Joe",
                        LastName = "Smith",
                        IsEmployee = true
                    }
                }
            };

            _validationResult = _familyValidator.Run(_family);
        }

        [TestMethod]
        public void ShouldReturnIsNotValid()
        {
            Assert.IsTrue(_validationResult.IsValid, "Should be valid");
        }

        [TestMethod]
        public void MessageShouldBeEmpty()
        {
            Assert.IsTrue(string.IsNullOrEmpty(_validationResult.Message));
        }
    }
}