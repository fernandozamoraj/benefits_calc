﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PBC.Models
{
    public class CalculatedResultsModel
    {
        public Family Family{ get;set;}
        public Decimal AnnualSalary { get; set; }
        public Decimal AnnualCosts { get; set; }
        public Decimal EmployerDiscounts { get; set; }
        public Decimal AdjustedPeriodPayAmount { get; set; }
        public Decimal PerPeriodCosts { get; set; }
    }
}