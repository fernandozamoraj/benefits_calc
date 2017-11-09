namespace PBC.Models
{
    /// <summary>
    /// Employee - Model Code for employe repository.
    /// This class is intended for access for access to employee related
    /// information.
    /// </summary>
    public class Employee
    {
        public string Name { get; set; }
        public int Dependents { get; set; }
        public decimal TotalCost { get; set; }
    }
}
