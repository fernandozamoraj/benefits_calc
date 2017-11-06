using System.Web.Mvc;
using PBC.Repos;

namespace PBC.App.Controllers
{
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