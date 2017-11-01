using System;
namespace PBC.Models
{
    public interface IModelMapper
    {
        CalculatedResultsModel MapToResults(ICalculation calculation);
    }
}
