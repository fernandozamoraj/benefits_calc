using System.Collections.Generic;

namespace PBC.Models
{
    /// <summary>
    /// Family - This is the aggregate for an employee and the members
    /// </summary>
    public class Family
    {
        private List<Person> _members;

        public Family()
        {
            _members = new List<Person>();
        }

        public List<Person> Members
        {
            get
            {
                return _members;
            }
            set
            {
                _members = value;
            }
        }
    }
}
