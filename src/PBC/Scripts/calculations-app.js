
function Member(fname, lname, dob, isSpouse, isEmployee) {
    this.FirstName = fname;
    this.LastName = lname;
    this.DateOfBirth = dob;
    this.IsSpouse = isSpouse;
    this.IsEmployee = isEmployee;

    this.FullName = fname + ' ' + lname;
    this.Role = isSpouse ? 'Spouse' : 'Dependent'
    this.Role = isEmployee ? 'Employee' : this.role
}

// This validation code take from stack overflow but it's pretty clear in what it 
// does.
// First it validates against a regex
// Then it splits each element (month,day,year) into a part which it converts to number values
// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
// It also accounts for valid leap year day of Feb 29
function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    let parts = dateString.split("/");
    let day = parseInt(parts[1], 10);
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function containsEmployee(members) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].IsEmployee) {
            return true;
        }
    }
    return false;
}

function validateCalculateSubmit(members) {
    let results = {};

    if (members.Length < 1 || containsEmployee(members) === false) {
        results.field = 1;
        results.isValid = false;
        results.message = "Employee is required";
    }

    return results;
}

function validate(candidateMember, members) {
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
    else if (candidateMember.DateOfBirth.length != 10) {
        results.field = 3;
        results.isValid = false;
        results.message = "Date of birth is not valid or has invalid format";
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

function updateInvalidForm(results) {

    let elements = document.querySelectorAll('[data-validation-id="' + results.field + '"]');

    elements[0].className += " invalid";

    let invalidMessageEl = document.getElementById("invalid-message");
    invalidMessageEl.innerHTML = results.message;
    invalidMessageEl.className += " invalid";
}

function clearInvalidForm() {
    let elements = document.querySelectorAll('[data-validation-id');

    //remove invalid class from from all elements
    for (let i = 0; i < elements.length; i++) {

        if (elements && elements[0]) {
            elements[i].className = elements[i].className.replace("invalid", "");
        }
    }

    var invalidMessageEl = document.getElementById("invalid-message");
    invalidMessageEl.innerHTML = "";
}

//Taken from http://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var app = new Vue({
    http:{
        emulateJSON: true,
        emulateHTTP: true
    },
    el: '#calc-app',
    data: {
        FirstName: '',
        LastName: '',
        DateOfBirth: '',
        IsEmployee: false,
        IsSpouse: false,
        members: [],
        results: {
            EmployeeName: '',
            AnnualSalary: 0.0,
            FamilyMembers: 0,
            AnnualCosts: 0.0,
            EmployerDiscounts: 0.0,
            AdjustedPeriodPayAmount: 0.0,
            PerPeriodCosts: 0.0
        }
    },
    methods: {
        add: function () {
            let candidateMember = new Member(this.FirstName, this.LastName, this.DateOfBirth, this.IsSpouse, this.IsEmployee);
            let results = validate(candidateMember, this.members);
            clearInvalidForm();

            if (results.isValid){
                this.members.push(candidateMember);
                this.clearMember();
            } else {
                updateInvalidForm(results);
            }
        },
        calculate: function () {
            let self = this;
            let results = validateCalculateSubmit(self.members);
            clearInvalidForm();

            if (results.isValid === false){
                updateInvalidForm(results);
                return;
            }
            
            this.$http.post('/api/benefitsapi/',
                {
                    Members: self.members
                },
                function(data, status, request){
                    if(status == 200)
                    {
                        console.log(data);
                        let results = data[0];
                        console.log(results);

                        self.results.EmployeeName = results.EmployeeName;
                        self.results.FamilyMembers = results.Family.Members.length;
                        self.results.AnnualSalary = round(results.AnnualSalary, 2);
                        self.results.AnnualCosts = round(results.AnnualCosts, 2);
                        self.results.EmployerDiscounts = round(results.EmployerDiscounts, 2);
                        self.results.AdjustedPeriodPayAmount = round(results.AdjustedPeriodPayAmount, 2);
                        self.results.PerPeriodCosts = round(results.PerPeriodCosts, 2);
                    }
                }
            );
        },
        clearMember: function () {
            this.FirstName = '';
            this.LastName = '';
            this.DateOfBirth = '';
            this.IsSpouse = false;
            this.IsEmployee = false;
        },
        isEmployeeChanged: function () {
            if (this.IsSpouse === true && this.IsEmployee === false) {
                this.IsSpouse = false;
            }
        },
        isSpouseChanged: function () {
            if (this.IsSpouse === false && this.IsEmployee === true) {
                this.IsEmployee = false;
            }
        }
    }
})