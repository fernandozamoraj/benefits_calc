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

        public BenefitsApiController(IAppConfiguration appConfig, ICalculator calculator, IModelMapper modelMapper)
        {
            _calculator = calculator;
            _appConfig = appConfig;
            _modelMapper = modelMapper;
        }

        // GET: api/BenefitsApi
        // This is purely for testing a get
        // Everything is hardcoded to simply test that
        // the controller is workin
        public CalculatedResultsModel Get()
        {
            return new CalculatedResultsModel
            {
                AdjustedPeriodPayAmount = 1,
                AnnualSalary = 52000,
                EmployeeName = "John Doe",
                AnnualCosts = 1000,
                EmployerDiscounts = 100,
                Family = new Family
                {
                    Members = new List<Person>
                    {
                        new Person
                        {
                            FirstName = "John",
                            LastName = "Doe",
                            DateOfBirth = System.DateTime.Now,
                            IsEmployee = true,
                            IsSpouse = false 
                        }
                    }
                }
            };
        }

        // GET: api/BenefitsApi/5
        public string Get(int id)
        {
            return "value";
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
