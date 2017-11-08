﻿using PBC.Models;

namespace PBC.Repos
{
    /// <summary>
    /// This interface is here to serve as an abstraction
    /// for dependency injection to provided substitution 
    /// ability in the controllers.
    /// It was originally used by the MVC controller to fetch
    /// Employee data.
    /// It is no longer used since I removed the front end from this
    /// solution and moved the front end logic to the react application.
    /// </summary>
    public interface IEmployeeRepository
    {
        System.Collections.Generic.List<Employee> GetAll();
    }
}
