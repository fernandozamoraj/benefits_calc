using System.Collections.Generic;
using PBC.Models;

namespace PBC.Repos
{
    /// <summary>
    /// This is only a simulated employee repository
    /// In a real application this would use an ORM to
    /// perfrom CRUD against the back end database.
    /// </summary>
    public class FamilyRepository : IFamilyRepository
    {
        private static List<Person> _familyMembers;

        public FamilyRepository()
        {
            _familyMembers = new List<Person>();
        }

        public List<Person> GetAll()
        {
            return _familyMembers;
        }

        public Person Save(Person p)
        {
            //simulate save
            //in real world this would be linked
            //to a database
            _familyMembers.Add(p);

            return p;
        }
    }
}
