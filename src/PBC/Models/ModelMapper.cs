using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PBC.Models
{
    public class ModelMapper : PBC.Models.IModelMapper
    {
        public CalculatedResultsModel MapToResults(ICalculation calculation)
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