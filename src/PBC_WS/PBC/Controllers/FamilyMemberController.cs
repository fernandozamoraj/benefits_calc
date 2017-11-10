using System;
using System.Diagnostics;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using PBC.Models;
using PBC.Repos;
using PBC.App.Services;
using PBC.Services;

namespace PBC.App.Controllers
{
    //secret sauce to configure webapi with structure map https://www.exceptionnotfound.net/setting-up-dependency-injection-in-web-api-with-structuremap/
    public class FamilyMemberController : ApiController
    {
        IAppConfiguration _appConfig;
        ICalculator _calculator;
        IModelMapper _modelMapper;
        IPersonValidator _personValidator;
        IFamilyRepository _familyRepository;

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
        public FamilyMemberController(IAppConfiguration appConfig, ICalculator calculator, 
            IModelMapper modelMapper, IPersonValidator personValidator, IFamilyRepository familyRepository)
        {
            _calculator = calculator;
            _appConfig = appConfig;
            _modelMapper = modelMapper;
            _personValidator = personValidator;
            _familyRepository = familyRepository;
        }

        public HttpResponseMessage Post([FromBody]Person model)
        {
            try
            {
                var validationResults = _personValidator.Run(model);

                if (validationResults.IsValid)
                {
                    Person p = _familyRepository.Save(model);
                    return Request.CreateResponse(HttpStatusCode.OK, p);
                }

                HttpError err = new HttpError("Invalid input parameter. " + validationResults.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, err);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                //TODO: log the exception
                HttpError err = new HttpError("Exception occurred check server logs");
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, err);
            }
        }
    }
}
