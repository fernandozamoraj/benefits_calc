using System;
using System.Collections.Generic;
using PBC.Models;

namespace PBC.Services
{
    public class PersonValidator : IPersonValidator
    {
        private List<Func<Person, ValidationResult>> _rules;

        public PersonValidator()
        {
            LoadRules();
        }

        public ValidationResult Run(Person person)
        {
            ValidationResult result = new ValidationResult();

            result.IsValid = true;

            //pseudo chain of responsiblity
            //breaks on first broken rule
            foreach (var rule in _rules)
            {
                result = rule(person);
                //Break out on first broken rule
                if (!result.IsValid)
                {
                    break;
                }
            }
            return result;
        }

        private void AddAttributesAreValidRule()
        {
            _rules.Add((member) =>
                {
                    ValidationResult validationResult = new ValidationResult();
                    validationResult.IsValid = true;
                
                    if (string.IsNullOrEmpty(member.FirstName))
                    {
                        validationResult.IsValid = false;
                        validationResult.Message = "First name is null or empty";
                    }
                    if (string.IsNullOrEmpty(member.LastName))
                    {
                        validationResult.IsValid = false;
                        validationResult.Message = "Last name is null or empty";
                    }

                    return validationResult;
                }
            );
        }

        private void LoadRules()
        {
            _rules = new List<Func<Person, ValidationResult>>();
            AddAttributesAreValidRule();
        }

    }
}
