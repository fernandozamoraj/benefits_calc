using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PBC.Models;

namespace PBC.Controllers
{
    //secret sauce to configure webapi with structure map https://www.exceptionnotfound.net/setting-up-dependency-injection-in-web-api-with-structuremap/
    public class BenefitsApiController : ApiController
    {

        IAppConfiguration _appConfig;
        ICalculation _calculation;
        IModelMapper _modelMapper;

        public BenefitsApiController(IAppConfiguration appConfig, ICalculation calculation, IModelMapper modelMapper)
        {
            _calculation = calculation;
            _appConfig = appConfig;
            _modelMapper = modelMapper;
        }

        // GET: api/BenefitsApi
        public IEnumerable<CalculatedResultsModel> Get()
        {
            CalculatedResultsModel[] results = new CalculatedResultsModel[]{_modelMapper.MapToResults(_calculation)};
            return results;
        }

        // GET: api/BenefitsApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BenefitsApi
        public IEnumerable<CalculatedResultsModel> Post([FromBody]Family model)
        {
            _calculation.RunCalculations(model, _appConfig);
            CalculatedResultsModel[] results = new CalculatedResultsModel[] { _modelMapper.MapToResults(_calculation) };
            return results;
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
