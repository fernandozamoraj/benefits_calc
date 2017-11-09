using PBC.Models;

namespace PBC.Services
{
    public interface IFamilyValidator
    {
        ValidationResult Run(Family family);
    }
}
