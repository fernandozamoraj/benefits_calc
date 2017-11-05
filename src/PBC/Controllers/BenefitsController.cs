using System.Web.Mvc;
using PBC.Repos;

namespace PBC.Controllers
{
    public class BenefitsController : Controller
    {
        IEmployeeRepository _employeeRepository;

        /// <summary>
        /// BenefitsController - A controller to view the benefits
        /// </summary>
        /// <param name="employeeRepository">Repostory to get the employee information</param>
        public BenefitsController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        // GET: Benefits
        public ActionResult Index()
        {
            return View(_employeeRepository.GetAll());
        }

        public ActionResult Create()
        {
            return View();
        }
    }
}