using System;
using PBC.Models;

namespace PBC.App.Models
{
    public class CalculatedResultsModel
    {
        public String EmployeeName { get; set; }
        public Family Family{ get;set;}
        public Decimal AnnualSalary { get; set; }
        public Decimal AnnualCosts { get; set; }
        public Decimal EmployerDiscounts { get; set; }
        public Decimal AdjustedPeriodPayAmount { get; set; }
        public Decimal PerPeriodCosts { get; set; }
    }
}