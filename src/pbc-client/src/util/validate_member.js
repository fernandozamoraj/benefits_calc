let isValidDate = function(d){
    
    //TODO: for now any date is accepted
    return true;
}

let Validator = {
    
    validateEmployeeExists: function(members){

        let results = {};
        results.isValid = true;

        for (let i = 0; i < members.length; i++)             {
            if (members[i].IsEmployee === true) {
                return results;
                break;
            }
        }

        results.field = 4;
        results.isValid = false;
        results.message = "There is no employee in this collection";
        return results;        
    },

    validateMember: function(candidateMember, members) {
        let results = {};
        results.isValid = true;

        if (candidateMember.FirstName.length < 2) {
            results.field = 1;
            results.isValid = false;
            results.message = "First Name is required";
        }
        else if (candidateMember.LastName.length < 2) {
            results.field = 2;
            results.isValid = false;
            results.message = "Last Name is required";
        }
        else if (isValidDate(candidateMember.DateOfBirth) === false) {
            results.field = 3;
            results.isValid = false;
            results.message = "Date of birth is not valid or has invalid format";
        }

        if (results.isValid === true) {
            for (let i = 0; i < members.length; i++)             {
                if (candidateMember.IsEmployee && members[i].IsEmployee) {
                    results.field = 4;
                    results.isValid = false;
                    results.message = "There is already an employee entered... only one allowed";
                    break;
                }
                if (candidateMember.IsSpouse && members[i].IsSpouse) {
                    results.field = 5;
                    results.isValid = false;
                    results.message = "There is already a spouse entered... only one allowed";
                    break;
                }
            }
        }

        return results;
    }
}

export default Validator;