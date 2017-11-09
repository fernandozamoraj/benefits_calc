using System;
using System.Diagnostics;
using System.Web.Http;
using System.Net;
using System.Net.Http;
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
        IFamilyValidator _familyValidator;

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
        public BenefitsApiController(IAppConfiguration appConfig, ICalculator calculator, IModelMapper modelMapper, IFamilyValidator familyValidator)
        {
            _calculator = calculator;
            _appConfig = appConfig;
            _modelMapper = modelMapper;
            _familyValidator = familyValidator;
        }


        // POST: api/BenefitsApi
        /// <summary>
        /// Post performs the calculation.
        /// </summary>
        /// <param name="model">a Family instance</param>
        /// <returns>CalculateResultsModel</returns>
        /// an IEnumerable collection
        public HttpResponseMessage Post([FromBody]Family model)
        {
            try
            {
                var validationResults = _familyValidator.Run(model);

                if (validationResults.IsValid)
                {
                    CalculationResults results = _calculator.RunCalculations(model, _appConfig);
                    CalculatedResultsModel resultsModel = _modelMapper.MapToResults(results);

                    return Request.CreateResponse(HttpStatusCode.OK, resultsModel);
                }

                HttpError err = new HttpError("Invalid input parameter. " + validationResults.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, err);
            }
            catch(Exception e)
            {
                Debug.WriteLine(e.Message);
                //TODO: log the exception
                HttpError err = new HttpError("Exception occurred check server logs");
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, err);
            }

        }
    }
}
