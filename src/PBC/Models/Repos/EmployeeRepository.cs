using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PBC.Models.Repos
{

    public class EmployeeRepository : PBC.Models.Repos.IEmployeeRepository
    {
        private List<EmployeeViewModel> _employees;

        public EmployeeRepository()
        {
            _employees = new List<EmployeeViewModel>{
                new EmployeeViewModel
                {
                    Name = "Smith, James",
                    Dependents = 3,
                    TotalCost = 2500
                },
                new EmployeeViewModel
                {
                    Name = "Joiner, John",
                    Dependents = 2,
                    TotalCost = 2000
                },
                new EmployeeViewModel
                {
                    Name = "Jones, Susan",
                    Dependents = 1,
                    TotalCost = 1500
                }
            };
        }

        public List<EmployeeViewModel> GetAll()
        {
            return _employees;
        }
    }
}