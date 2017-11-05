using PBC.Models;

namespace PBC.Services
{
    public interface ICalculator
    {
        CalculationResults RunCalculations(Family family, IAppConfiguration appConfig);
    }
}
