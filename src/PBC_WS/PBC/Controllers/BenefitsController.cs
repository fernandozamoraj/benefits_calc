using System.Web.Mvc;
using PBC.Repos;

namespace PBC.App.Controllers
{
    /// <summary>
    /// BenefitsController - controller for the front end of this application
    /// It doesn't do much since all front end logic was moved into the react application.
    /// </summary>
    public class BenefitsController : Controller
    {

        /// <summary>
        /// BenefitsController - A controller to view the benefits
        /// </summary>
        public BenefitsController()
        {
        }

        // GET: Benefits
        public ActionResult Index()
        {
            return View();
        }
    }
}