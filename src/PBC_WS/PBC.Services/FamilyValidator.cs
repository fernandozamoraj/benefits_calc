using System;
using System.Collections.Generic;
using PBC.Models;

namespace PBC.Services
{
    public class FamilyValidator : IFamilyValidator
    {
        private List<Func<Family, ValidationResult>> _rules;        

        public FamilyValidator()
        {
            LoadRules();
        }

        public ValidationResult Run(Family family)
        {
            ValidationResult result = new ValidationResult();

            result.IsValid = true;

            //pseudo chain of responsiblity
            //breaks on first broken rule
            foreach (var rule in _rules)
            {
                result = rule(family);
                //Break out on first broken rule
                if (!result.IsValid)
                {
                    break;
                }
            }
            return result;
        }

        private void AddEmployeePresentRule()
        {
            _rules.Add((f) =>
                {
                    var validationResult = new ValidationResult();

                    int employeeCount = 0;
                    foreach (var member in f.Members)
                    {
                        if (member.IsEmployee)
                        {
                            employeeCount++;
                        }
                    }

                    validationResult.IsValid = true;
                    validationResult.Message = string.Empty;

                    if(employeeCount > 1)
                    {
                        validationResult.IsValid = false;
                        validationResult.Message = "Family contains employee more than one employee";
                    }
                    else if(employeeCount < 1)
                    {
                        validationResult.IsValid = false;
                        validationResult.Message = "Family contains employee more than one employee";
                    }

                    return validationResult;
                }
           );
        }
        

        private void AddMembersAreValidRule()
        {
            _rules.Add((f) =>
                {
                    ValidationResult validationResult = new ValidationResult();
                    validationResult.IsValid = true;

                    foreach (var member in f.Members)
                    {
                        if (string.IsNullOrEmpty(member.FirstName))
                        {
                            validationResult.IsValid = false;
                            validationResult.Message = "First name is null or empty";
                            break;
                        }
                        if (string.IsNullOrEmpty(member.LastName))
                        {
                            validationResult.IsValid = false;
                            validationResult.Message = "Last name is null or empty";
                            break;
                        }
                    }

                    return validationResult;
                }
            );
        }

        private void LoadRules()
        {
            _rules = new List<Func<Family, ValidationResult>>();
            AddEmployeePresentRule();
            AddMembersAreValidRule();
        }

    }
}
