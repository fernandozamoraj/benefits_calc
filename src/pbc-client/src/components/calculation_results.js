import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import './styles/calculation_results.css';

/**
 * CalculationResults - This is the component to display
 * the CalculationResults
 */
class CalculationResults extends Component{

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render(){
        const results = this.props.results;
        return (
            <Table selectable={false}>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>Name:</TableRowColumn>
                        <TableRowColumn>{results.EmployeeName}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Family Size:</TableRowColumn>
                        <TableRowColumn> {results.FamilyMembers}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Salary:</TableRowColumn>
                        <TableRowColumn>{results.AnnualSalary}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Annual Costs:</TableRowColumn>
                        <TableRowColumn>{results.AnnualCosts}</TableRowColumn>
                     </TableRow>
                    <TableRow>
                        <TableRowColumn>Discount:</TableRowColumn>
                        <TableRowColumn>{results.EmployerDiscounts}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                    <TableRowColumn>Bi-weekly Costs</TableRowColumn>
                        <TableRowColumn>{results.PerPeriodCosts}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Bi-weekly Pay</TableRowColumn>
                        <TableRowColumn>{results.AdjustedPeriodPayAmount}</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
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