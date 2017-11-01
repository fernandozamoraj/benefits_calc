using System;
namespace PBC.Models.Repos
{
    public interface IEmployeeRepository
    {
        System.Collections.Generic.List<PBC.Models.EmployeeViewModel> GetAll();
    }
}
