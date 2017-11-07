using PBC.Models;
using PBC.App.Models;


namespace PBC.App.Services
{
    public interface IModelMapper
    {
        CalculatedResultsModel MapToResults(CalculationResults calculation);
    }
}
