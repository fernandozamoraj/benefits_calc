import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import PropTypes from 'prop-types';

const styles = {
    block: {
      maxWidth: 450,
      marginLeft: 250,
      padding: 50
    },
    checkbox: {
      marginBottom: 16,
      maxWidth: 150
    }    
};

class CalculationResults extends Component{

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render(){
        const results = this.props.results;

        return (
            <div>
                <ul className="results">
                    <li>Name: {results.EmployeeName}</li>
                    <li>Family Size: {results.FamilySize}</li>
                    <li>Salary: {results.AnnualSalary}</li>   
                    <li>Annual Costs: {results.AnnualCosts}</li>
                    <li>Adjusted Pay/Period: {results.AdjustedPeriodPayAmount}</li>
                    <li>Pay Perdio Costs: {results.PerPeriodCosts}</li>
                    <li>Discounts:  {results.EmployerDiscounts}</li>
                </ul>
            </div>
        );
    }
}

CalculationResults.defaultProps = {

    results: {
        EmployeeName: '',
        AnnualSalary: 0.0,
        AnnualCosts: 0.0,
        AdjustPeriodAmount: 0.0,
        EmployerDiscounts: 0.0,
        FamilySize: 0
    }
}

export default CalculationResults;