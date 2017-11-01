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
            model.AdjustedPeriodPayAmount = calculation.AdjustPeriodAmount;
            model.AnnualCosts = calculation.AnnualCosts;
            model.AnnualSalary = calculation.AnnualSalary;
            model.EmployerDiscounts = calculation.EmployerDiscounts;
            model.Family = calculation.Family;
            model.PerPeriodCosts = (calculation.AnnualCosts-calculation.EmployerDiscounts) / 26;
            
            return model;
        }
    }
}