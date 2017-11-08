using System.Collections.Generic;
using PBC.Models;

namespace PBC.Repos
{
    /// <summary>
    /// This is only a simulated employee repository
    /// In a real application this would use an ORM to
    /// perfrom CRUD against the back end database.
    /// </summary>
    public class EmployeeRepository : IEmployeeRepository
    {
        private List<Employee> _employees;

        public EmployeeRepository()
        {
            _employees = new List<Employee>{
                new Employee
                {
                    Name = "Smith, James",
                    Dependents = 3,
                    TotalCost = 2500
                },
                new Employee
                {
                    Name = "Joiner, John",
                    Dependents = 2,
                    TotalCost = 2000
                },
                new Employee
                {
                    Name = "Jones, Susan",
                    Dependents = 1,
                    TotalCost = 1500
                }
            };
        }

        public List<Employee> GetAll()
        {
            return _employees;
        }
    }
}
