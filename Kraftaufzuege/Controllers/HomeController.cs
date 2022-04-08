using Kraftaufzuege.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Kraftaufzuege.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        public IActionResult Synergy100()
        {
            return View();
        }

        public IActionResult Synergy200()
        {
            return View();
        }

        public IActionResult Service()
        {
            return View();
        }

        public IActionResult Synergy300()
        {
            return View();
        }

        public IActionResult Velino()
        {
            return View();
        }

        public IActionResult Evolution300()
        {
            return View();
        }

        public IActionResult Sonic()
        {
            return View();
        }

        public IActionResult Twin()
        {
            return View();
        }

        public IActionResult H100()
        {
            return View();
        }

        public IActionResult H300()
        {
            return View();
        }

        public IActionResult Planning()
        {
            return View();
        }

        public IActionResult Enta200()
        {
            return View();
        }

        public IActionResult Rebranding()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
