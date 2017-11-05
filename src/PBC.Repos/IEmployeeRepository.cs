using PBC.Models;

namespace PBC.Repos
{
    public interface IEmployeeRepository
    {
        System.Collections.Generic.List<Employee> GetAll();
    }
}
