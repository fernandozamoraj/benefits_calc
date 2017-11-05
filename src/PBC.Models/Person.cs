using System;

namespace PBC.Models
{
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsSpouse { get; set; }
    }
}
