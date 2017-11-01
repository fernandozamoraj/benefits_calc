
function Member(fname, lname, dob, isSpouse, isEmployee) {
    this.firstName = fname;
    this.lastName = lname;
    this.dob = dob;
    this.isSpouse = isSpouse;
    this.isEmployee = isEmployee;

    this.fullName = fname + ' ' + lname;
    this.role = isSpouse ? 'Spouse' : 'Dependent'
    this.role = isEmployee ? 'Employee' : this.role
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
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function validate(candidateMember, members) {
    var results = {};
    results.isValid = true;

    if (candidateMember.firstName.length < 2) {
        results.field = 1;
        results.isValid = false;
        results.message = "First Name is required";
    }
    else if (candidateMember.lastName.length < 2) {
        results.field = 2;
        results.isValid = false;
        results.message = "Last Name is required";
    }
    else if (candidateMember.dob.length != 10) {
        results.field = 3;
        results.isValid = false;
        results.message = "Date of birth is not valid or has invalid format";
    }
    else if (isValidDate(candidateMember.dob) === false) {
        results.field = 3;
        results.isValid = false;
        results.message = "Date of birth is not valid or has invalid format";
    }

    if (results.isValid === true) {
        for (var i = 0; i < members.length; i++)             {
            if (candidateMember.isEmployee && members[i].isEmployee) {
                results.field = 4;
                results.isValid = false;
                results.message = "There is already an employee entered... only one allowed";
                break;
            }
            if (candidateMember.isSpouse && members[i].isSpouse) {
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

    var elements = document.querySelectorAll('[data-validation-id="' + results.field + '"]');

    elements[0].className += " invalid";

    var invalidMessageEl = document.getElementById("invalid-message");
    invalidMessageEl.innerHTML = results.message;
    invalidMessageEl.className += " invalid";
}

function clearInvalidForm() {
    var elements = document.querySelectorAll('[data-validation-id');

    //remove invalid class from from all elements
    for (var i = 0; i < elements.length; i++) {

        if (elements && elements[0]) {
            elements[i].className = elements[i].className.replace("invalid", "");
        }
    }

    var invalidMessageEl = document.getElementById("invalid-message");
    invalidMessageEl.innerHTML = "";
}

var app = new Vue({
    el: '#calc-app',
    data: {
        message: 'Hello Vue!',
        firstName: '',
        lastName: '',
        dob: '',
        isSpouse: false,
        isEmployee: false,
        members: [],
        results: {
            annualSalary: 0.0,
            annualCosts: 0.0,
            employerDiscounts: 0.0,
            adjustedPeriodPayAmount: 0.0,
            perPeriodCosts: 0.0
        }
    },
    methods: {
        add: function () {
            var candidateMember = new Member(this.firstName, this.lastName, this.dob, this.isSpouse, this.isEmployee);
            var results = validate(candidateMember, this.members);
            clearInvalidForm();

            if (results.isValid) {
                this.members.push(candidateMember);
                this.clearMember();
            }
            else {
                updateInvalidForm(results);
            }
        },
        calculate: function () {
            let self = this;

            let tempMembers = [];

            //convert data properly for json transformation to
            //objects on the back end
            for(let i=0;i<self.members.length;i++){
                tempMembers.push(
                    
                    {
                        FirstName: self.members[i].firstName,
                        LastName: self.members[i].lastName,
                        DateOfBirth: self.members[i].dob,
                        IsEmployee: self.members[i].isEmployee,
                        IsSpouse: self.members[i].isSpouse
                    }
               );
            }

            function getEmployeeName(results) {
                //TODO: fix
                return "Joe Smith";
            }

            $.ajax("/api/benefitsapi/", {
                type: "POST",
                success: function (data) {

                    console.log(data);
                    let d0 = data[0];
                    console.log(d0);

                    self.results.employeeName = getEmployeeName(d0);
                    self.results.familyMembers = d0.Family.Members.length;
                    self.results.annualSalary = d0.AnnualSalary;
                    self.results.annualCosts = d0.AnnualCosts;
                    self.results.employerDiscounts = d0.EmployerDiscounts;
                    self.results.adjustedPeriodPayAmount = d0.AdjustedPeriodPayAmount;
                    self.results.perPeriodCosts = d0.PerPeriodCosts;
                },
                dataType: 'JSON',
                data: {
                        Members: tempMembers
                }
            });
        },
        clearMember: function () {
            this.firstName = '';
            this.lastName = '';
            this.dob = '';
            this.isSpouse = false;
            this.isEmployee = false;
        },
        isEmployeeChanged: function () {
            if (this.isSpouse === true && this.isEmployee === false) {
                this.isSpouse = false;
            }
        },
        isSpouseChanged: function () {
            if (this.isSpouse === false && this.isEmployee === true) {
                this.isEmployee = false;
            }
        }
    }
})