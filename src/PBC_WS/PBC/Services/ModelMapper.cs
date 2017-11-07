using System;
using System.Linq;
using PBC.Models;
using PBC.App.Models;

namespace PBC.App.Services
{
    public class ModelMapper : IModelMapper
    {
        public CalculatedResultsModel MapToResults(CalculationResults calculation)
        {
            CalculatedResultsModel model = new CalculatedResultsModel();

            //Brute force approach
            //in real application we can integrate a mapping technology such
            //as automapper
            model.EmployeeName = getEmployeeName(calculation.Family);
            model.AdjustedPeriodPayAmount = calculation.AdjustPeriodAmount;
            model.AnnualCosts = calculation.AnnualCosts;
            model.AnnualSalary = calculation.AnnualSalary;
            model.EmployerDiscounts = calculation.EmployerDiscounts;
            model.Family = calculation.Family;
            model.PerPeriodCosts = (calculation.AnnualCosts-calculation.EmployerDiscounts) / 26;
            
            return model;
        }

        private String getEmployeeName(Family family)
        {
            var query = from a in family.Members
                               where a.IsEmployee == true
                               select a;

            var p = query.First<Person>();

            if (p != null)
            {
                return p.FirstName + " " + p.LastName;
            }

            return "<NO NAME>";
        }
    }
}