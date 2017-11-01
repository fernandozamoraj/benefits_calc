using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PBC.Models
{
    public class EmployeeViewModel
    {
        public string Name { get; set; }
        public int Dependents { get; set; }
        public decimal TotalCost { get; set; }

    }
}