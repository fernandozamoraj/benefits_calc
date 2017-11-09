using PBC.Models;

namespace PBC.Services
{
    public interface IPersonValidator
    {
        ValidationResult Run(Person person);
    }
}
