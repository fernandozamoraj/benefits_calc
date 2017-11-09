using System;

namespace PBC.Models
{
    /// <summary>
    /// Person is simply an object that holds attributes
    /// for a member in the plan
    /// </summary>
    public class Person
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsSpouse { get; set; }
    }
}
