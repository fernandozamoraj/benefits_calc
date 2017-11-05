using System.Collections.Generic;
using System.Web.Http;
using PBC.Models;
using PBC.App.Models;
using PBC.App.Services;
using PBC.Services;

namespace PBC.Controllers
{
    //secret sauce to configure webapi with structure map https://www.exceptionnotfound.net/setting-up-dependency-injection-in-web-api-with-structuremap/
    public class BenefitsApiController : ApiController
    {

        IAppConfiguration _appConfig;
        ICalculator _calculator;
        IModelMapper _modelMapper;

        public BenefitsApiController(IAppConfiguration appConfig, ICalculator calculator, IModelMapper modelMapper)
        {
            _calculator = calculator;
            _appConfig = appConfig;
            _modelMapper = modelMapper;
        }

        // GET: api/BenefitsApi
        public string Get()
        {
            return "Not Implemented";
        }

        // GET: api/BenefitsApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BenefitsApi
        public IEnumerable<CalculatedResultsModel> Post([FromBody]Family model)
        {
            CalculationResults results = _calculator.RunCalculations(model, _appConfig);
            CalculatedResultsModel resultsModel =  _modelMapper.MapToResults(results);

            return new List<CalculatedResultsModel> { resultsModel };
        }

        // PUT: api/BenefitsApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BenefitsApi/5
        public void Delete(int id)
        {
        }
    }
}
