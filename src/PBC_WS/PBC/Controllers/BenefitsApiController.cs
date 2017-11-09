using System.Collections.Generic;
using System.Web.Http;
using PBC.Models;
using PBC.App.Models;
using PBC.App.Services;
using PBC.Services;

namespace PBC.App.Controllers
{
    //secret sauce to configure webapi with structure map https://www.exceptionnotfound.net/setting-up-dependency-injection-in-web-api-with-structuremap/
    public class BenefitsApiController : ApiController
    {

        IAppConfiguration _appConfig;
        ICalculator _calculator;
        IModelMapper _modelMapper;

        /// <summary>
        /// BenefitsApiController - This is a simple controller to perform the calculations.
        /// This was the chosen method for performing calculations to demonstrate
        /// a .Net application.
        /// The dependencies for this project are injected with the help of the 
        /// IOC Framework StructureMap
        /// </summary>
        /// <param name="appConfig"></param>
        /// <param name="calculator"></param>
        /// <param name="modelMapper"></param>
        public BenefitsApiController(IAppConfiguration appConfig, ICalculator calculator, IModelMapper modelMapper)
        {
            _calculator = calculator;
            _appConfig = appConfig;
            _modelMapper = modelMapper;
        }


        // POST: api/BenefitsApi
        /// <summary>
        /// Post performs the calculation.
        /// </summary>
        /// <param name="model">a Family instance</param>
        /// <returns>CalculateResultsModel</returns>
        /// TODO: This needs to change to return just one object instead of 
        /// an IEnumerable collection
        public IEnumerable<CalculatedResultsModel> Post([FromBody]Family model)
        {
            CalculationResults results = _calculator.RunCalculations(model, _appConfig);
            CalculatedResultsModel resultsModel =  _modelMapper.MapToResults(results);

            return new List<CalculatedResultsModel> { resultsModel };
        }
    }
}
