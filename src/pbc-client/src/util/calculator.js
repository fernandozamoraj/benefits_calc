import appConfig from './app_config';

class Calculator{

    /// <summary>
    /// Calculator is a service object that
    /// performs calculations and returns the results of those calculations.
    /// </summary>
    /// <param name="family">this parameter is input to perform the calculations</param>
    /// <param name="appConfig">The app config is provides values necessary for the calculations</param>
    /// <returns></returns>
    runCalculations(family)
    {
        let totalAnnualCosts = 0;
        let employerDiscounts = 0;

        family.Members.map((p) => {
            let annualCosts = 0;
            
            if (p.IsEmployee === true) {
                annualCosts = appConfig.AnnualCostPerEmployee;
            } else {
                annualCosts = appConfig.AnnualCostPerMember;
            }

            totalAnnualCosts += annualCosts;

            if (this.qualifiesForDiscount(p.FirstName)) {
                employerDiscounts += (appConfig.BonusDiscountPercentage * .010) * annualCosts;
            }

            return annualCosts;
        });

        const results = {
            EmployeeName: this.getEmployeeName(family),
            AdjustedPeriodPayAmount: ((appConfig.AnnualSalary - totalAnnualCosts) + employerDiscounts) / 26,
            AnnualCosts: totalAnnualCosts,
            AnnualSalary: appConfig.AnnualSalary,
            EmployerDiscounts: employerDiscounts,
            Family: family,
            PerPeriodCosts: (totalAnnualCosts-employerDiscounts) / 26
        };
        
        return results;
    }

    getEmployeeName(family){
        const employeeName = family.Members.reduce( (accumulator, currentValue) => {
                                    let temp = '';
                                    if(currentValue.IsEmployee === true){
                                        temp = (currentValue.FirstName + ' ' + currentValue.LastName);
                                    }
                                    return accumulator + temp;
                            }, '');

        return employeeName;
    }

    /**
     * qualifiesForDiscount - A contrived rule that say that 
     * a family member qualifies for a discount if their name
     * starts with the letter 'A' 
     * @param {String} name 
     */
    qualifiesForDiscount(name)  {
        if (name && name.toUpperCase()[0] === 'A') {
            return true;
        }

        return false;
    }
}

const calculator = new Calculator();

export default calculator;